#!/usr/bin/env python3
import os
import re
import json

def find_testcase_files():
    result = []
    for root, dirs, files in os.walk('/workspace/algo-lens'):
        for file in files:
            if file == 'testcase.ts':
                result.append(os.path.join(root, file))
    return result

def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find all test case objects
    testcase_pattern = r'(\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})'
    testcase_array_pattern = r'export const testcases[^=]*=\s*\[(.*?)\];'
    
    # Extract the array content
    array_match = re.search(testcase_array_pattern, content, re.DOTALL)
    if not array_match:
        print(f"Could not find testcases array in {file_path}")
        return
    
    array_content = array_match.group(1)
    
    # Find all test case objects
    testcases = []
    depth = 0
    current_testcase = ""
    
    for char in array_content:
        if char == '{':
            depth += 1
            current_testcase += char
        elif char == '}':
            depth -= 1
            current_testcase += char
            if depth == 0:
                testcases.append(current_testcase.strip())
                current_testcase = ""
        elif depth > 0:
            current_testcase += char
    
    # Filter out empty strings
    testcases = [tc for tc in testcases if tc]
    
    if not testcases:
        print(f"No test cases found in {file_path}")
        return
    
    # Choose the middle test case
    middle_index = len(testcases) // 2
    
    # Add isDefault to the middle test case if it doesn't already have it
    updated_testcases = []
    for i, tc in enumerate(testcases):
        if i == middle_index:
            # Check if isDefault is already present
            if 'isDefault' not in tc:
                # Find the last closing brace
                last_brace_index = tc.rfind('}')
                if last_brace_index > 0:
                    # Check if there's a comma before the closing brace
                    comma_needed = tc[last_brace_index-1].strip() not in [',', '{']
                    # Insert isDefault before the closing brace
                    updated_tc = tc[:last_brace_index]
                    if comma_needed:
                        updated_tc += ','
                    updated_tc += '\n    isDefault: true' + tc[last_brace_index:]
                    updated_testcases.append(updated_tc)
                    continue
        updated_testcases.append(tc)
    
    # Replace the array content in the original file
    updated_array_content = ',\n  '.join(updated_testcases)
    updated_content = re.sub(
        testcase_array_pattern,
        f'export const testcases = [\n  {updated_array_content}\n];',
        content,
        flags=re.DOTALL
    )
    
    with open(file_path, 'w') as f:
        f.write(updated_content)
    
    print(f"Updated {file_path} - added isDefault to test case #{middle_index + 1}")

def main():
    files = find_testcase_files()
    for file in files:
        process_file(file)
    print(f"Processed {len(files)} testcase files")

if __name__ == "__main__":
    main()
