import React from 'react';
import { render, screen } from '@testing-library/react';
import CodePreview from './CodePreview';
import type { Problem, VariableMetadata } from 'algo-lens-core';

// Mock the ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Mock scrollTo
window.HTMLElement.prototype.scrollTo = function() {};


// Simplified mock Problem type for tests
interface MockProblem extends Omit<Problem<any, any>, 'metadata' | 'code'> {
  code: string;
  metadata?: {
    variables?: Partial<VariableMetadata>[];
  };
}

// Sample Problem objects
const problemWithoutMetadata: MockProblem = {
  code: "const x = 1;\nlet y = 2;",
  id: 'problem1',
  title: 'Problem Without Metadata',
  emoji: '🧪',
  func: () => [],
  testcases: [],
  difficulty: 'easy',
  tags: [],
};

const problemWithEmptyVariables: MockProblem = {
  ...problemWithoutMetadata,
  id: 'problem2',
  title: 'Problem With Empty Variables',
  metadata: {
    variables: [],
  },
};

const problemWithNullVariables: MockProblem = {
  ...problemWithoutMetadata,
  id: 'problem3',
  title: 'Problem With Null Variables',
  metadata: {
    variables: undefined, // or null
  },
};

const problemForHighlighting: MockProblem = {
  code: "let val = 10;\nconst anotherVal = 20;\nlet val = val + 1;",
  id: 'problem4',
  title: 'Problem for Highlighting',
  emoji: '🧪',
  func: () => [],
  testcases: [],
  difficulty: 'medium',
  tags: [],
  metadata: {
    variables: [
      { name: "val", emoji: "💡", description: "A value" },
      { name: "anotherVal", emoji: "✨", description: "Another value" },
    ],
  },
};

const problemForWholeWord: MockProblem = {
  code: "let variable = 1;\nlet i = 0;\nlet vari = 2;",
  id: 'problem5',
  title: 'Problem for Whole Word Matching',
  emoji: '🧪',
  func: () => [],
  testcases: [],
  difficulty: 'hard',
  tags: [],
  metadata: {
    variables: [
      { name: "i", emoji: "👆", description: "Index variable" },
    ],
  },
};


describe('CodePreview Component', () => {
  // Test Case 1: Basic Rendering
  it('should render plain code when no problem prop is provided', () => {
    render(<CodePreview code="const a = 1;" highlightLineIndex={-1} />);
    expect(screen.getByText('const a = 1;')).toBeInTheDocument();
  });

  it('should render plain code when problem.metadata.variables is null', () => {
    render(
      <CodePreview
        code={problemWithNullVariables.code}
        problem={problemWithNullVariables as Problem<any, any>}
        highlightLineIndex={-1}
      />
    );
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('let y = 2;')).toBeInTheDocument();
  });

  it('should render plain code when problem.metadata.variables is empty', () => {
    render(
      <CodePreview
        code={problemWithEmptyVariables.code}
        problem={problemWithEmptyVariables as Problem<any, any>}
        highlightLineIndex={-1}
      />
    );
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('let y = 2;')).toBeInTheDocument();
  });

  // Test Case 2: Variable Highlighting and Emojis
  describe('Variable Highlighting and Emojis', () => {
    it('should highlight variables with emoji and default color', () => {
      render(
        <CodePreview
          code={problemForHighlighting.code}
          problem={problemForHighlighting as Problem<any, any>}
          highlightLineIndex={-1}
        />
      );

      // Check "val"
      const valElements = screen.getAllByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.trim() === '💡 val';
      });
      expect(valElements.length).toBe(3); // "val" appears 3 times
      valElements.forEach(el => {
        expect(el).toHaveClass('text-yellow-500');
        expect(el.textContent).toBe('💡 val');
      });

      // Check "anotherVal"
      const anotherValElements = screen.getAllByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.trim() === '✨ anotherVal';
      });
      expect(anotherValElements.length).toBe(1);
      anotherValElements.forEach(el => {
        expect(el).toHaveClass('text-yellow-500');
        expect(el.textContent).toBe('✨ anotherVal');
      });
    });

    it('should only highlight whole words', () => {
      render(
        <CodePreview
          code={problemForWholeWord.code}
          problem={problemForWholeWord as Problem<any, any>}
          highlightLineIndex={-1}
        />
      );

      // Check "i"
      const iElements = screen.getAllByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.trim() === '👆 i';
      });
      expect(iElements.length).toBe(1);
      iElements.forEach(el => {
        expect(el).toHaveClass('text-yellow-500');
        expect(el.textContent).toBe('👆 i');
      });
      
      // Ensure "variable" and "vari" are not misinterpreted
      // The text "variable" itself will be split by the highlighted "i" if not careful,
      // so we check for spans with "variable" or "vari" content
      const variableSpan = screen.queryByText((content, element) => 
        element?.tagName.toLowerCase() === 'span' && content.includes('variable')
      );
      expect(variableSpan).toBeNull();

      const variSpan = screen.queryByText((content, element) =>
        element?.tagName.toLowerCase() === 'span' && content.includes('vari')
      );
      expect(variSpan).toBeNull();

      // Check that the text "variable" and "vari" are still present as plain text
      expect(screen.getByText((content, element) => content.startsWith('let variable'))).toBeInTheDocument();
      expect(screen.getByText((content, element) => content.startsWith('let vari'))).toBeInTheDocument();


    });
  });

  // Test Case 3: Interaction with highlightLineIndex
  describe('Interaction with highlightLineIndex', () => {
    it('should highlight the specified line and variables on it', () => {
      const code = "let abc = 123;\nconst xyz = 456;\nlet abc = 789;";
      const problemWithHighlight: MockProblem = {
        ...problemForHighlighting, // Re-use some structure
        code: code,
        metadata: {
          variables: [
            { name: "abc", emoji: "🅰️" },
            { name: "xyz", emoji: "🅾️" },
          ],
        },
      };

      render(
        <CodePreview
          code={problemWithHighlight.code}
          problem={problemWithHighlight as Problem<any, any>}
          highlightLineIndex={1} // Highlight the second line (index 1)
        />
      );

      // Check line highlighting for the second line
      const line2 = screen.getByText((content, element) => {
        return content.includes("const xyz = 456;");
      }).closest('p');
      expect(line2).toHaveClass('text-primary-content', 'bg-primary', 'highlighted');

      // Check variable "xyz" on the highlighted line
      const xyzElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.trim() === '🅾️ xyz';
      });
      expect(xyzElement).toHaveClass('text-yellow-500');
      expect(xyzElement.textContent).toBe('🅾️ xyz');
      expect(line2).toContainElement(xyzElement);


      // Check variable "abc" on the first line (not the highlighted line)
      const abcElementsLine1 = screen.getAllByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.trim() === '🅰️ abc';
      });
      // abc appears on line 1 and line 3
      expect(abcElementsLine1.length).toBe(2); 
      
      const line1 = screen.getByText((content, element) => content.includes("let abc = 123;")).closest('p');
      expect(line1).not.toHaveClass('text-primary-content', 'bg-primary', 'highlighted');
      // Check that one of the "abc" spans is on line 1
      let abcOnLine1Found = false;
      abcElementsLine1.forEach(el => {
          expect(el).toHaveClass('text-yellow-500');
          if(line1?.contains(el)) abcOnLine1Found = true;
      });
      expect(abcOnLine1Found).toBe(true);


      // Check variable "abc" on the third line (not the highlighted line)
      const line3 = screen.getByText((content, element) => content.includes("let abc = 789;")).closest('p');
      expect(line3).not.toHaveClass('text-primary-content', 'bg-primary', 'highlighted');
      // Check that one of the "abc" spans is on line 3
      let abcOnLine3Found = false;
      abcElementsLine1.forEach(el => {
          expect(el).toHaveClass('text-yellow-500');
          if(line3?.contains(el)) abcOnLine3Found = true;
      });
      expect(abcOnLine3Found).toBe(true);

    });
  });
});

// Helper to setup Jest DOM matchers if not already done (e.g. in setupTests.ts)
// import '@testing-library/jest-dom';
// If you don't have a global setup file for jest-dom, you might need to import it here
// or ensure your jest config loads it. For this exercise, I'm assuming it's globally available.
