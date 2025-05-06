#!/bin/bash

# Find all testcase.ts files
files=$(find /workspace/algo-lens -name "testcase.ts")

for file in $files; do
  echo "Processing $file"
  
  # Count the number of test cases in the file
  num_testcases=$(grep -c "input:" "$file")
  
  # If there are no test cases, skip this file
  if [ "$num_testcases" -eq 0 ]; then
    echo "No test cases found in $file, skipping"
    continue
  fi
  
  # Calculate the middle test case index (0-based)
  middle_index=$(( (num_testcases - 1) / 2 ))
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Process the file line by line
  current_testcase=0
  in_testcase=false
  
  while IFS= read -r line; do
    # Check if we're entering a new test case
    if [[ "$line" =~ \{[[:space:]]*input: ]]; then
      in_testcase=true
      current_testcase=$((current_testcase + 1))
      
      # If this is the middle test case, add the isDefault flag
      if [ "$current_testcase" -eq $((middle_index + 1)) ]; then
        # Check if the line ends with a comma
        if [[ "$line" =~ ,$ ]]; then
          echo "$line" >> "$temp_file"
        else
          # Add a comma if needed
          echo "$line," >> "$temp_file"
        fi
        echo "    isDefault: true," >> "$temp_file"
        continue
      fi
    # Check if we're exiting a test case
    elif [[ "$line" =~ \}[[:space:]]*,? ]]; then
      in_testcase=false
    fi
    
    # Write the line to the temporary file
    echo "$line" >> "$temp_file"
  done < "$file"
  
  # Replace the original file with the temporary file
  mv "$temp_file" "$file"
  
  echo "Added isDefault: true to test case #$((middle_index + 1)) in $file"
done

echo "All testcase.ts files have been updated."
