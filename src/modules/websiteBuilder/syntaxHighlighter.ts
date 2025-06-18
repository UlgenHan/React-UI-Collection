import React from 'react';

// Simple syntax highlighting utility
// This provides basic highlighting without external dependencies

export interface HighlightedToken {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'function' | 'operator' | 'default';
}

export class SyntaxHighlighter {
  private static typescriptKeywords = [
    'import', 'export', 'from', 'const', 'let', 'var', 'function', 'return',
    'interface', 'type', 'class', 'extends', 'implements', 'public', 'private',
    'protected', 'static', 'async', 'await', 'try', 'catch', 'finally', 'throw',
    'if', 'else', 'switch', 'case', 'default', 'for', 'while', 'do', 'break',
    'continue', 'in', 'of', 'new', 'this', 'super', 'void', 'any', 'unknown',
    'never', 'boolean', 'number', 'string', 'object', 'array', 'null', 'undefined',
    'true', 'false', 'React', 'FC', 'JSX', 'IntrinsicElements'
  ];

  private static htmlKeywords = [
    'html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style',
    'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img',
    'button', 'input', 'form', 'label', 'select', 'option', 'textarea',
    'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
    'section', 'article', 'header', 'footer', 'nav', 'aside', 'main',
    'iframe', 'canvas', 'svg', 'path', 'circle', 'rect', 'line', 'polygon'
  ];

  private static cssKeywords = [
    'color', 'background', 'border', 'margin', 'padding', 'width', 'height',
    'display', 'position', 'top', 'left', 'right', 'bottom', 'flex', 'grid',
    'justify-content', 'align-items', 'text-align', 'font-size', 'font-weight',
    'text-decoration', 'box-shadow', 'border-radius', 'opacity', 'transform',
    'transition', 'animation', 'z-index', 'overflow', 'cursor', 'pointer-events'
  ];

  static highlightTypeScript(code: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    const lines = code.split('\n');

    for (const line of lines) {
      const lineTokens = this.highlightTypeScriptLine(line);
      tokens.push(...lineTokens);
      tokens.push({ text: '\n', type: 'default' });
    }

    return tokens;
  }

  static highlightHTML(code: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    const lines = code.split('\n');

    for (const line of lines) {
      const lineTokens = this.highlightHTMLLine(line);
      tokens.push(...lineTokens);
      tokens.push({ text: '\n', type: 'default' });
    }

    return tokens;
  }

  static highlightCSS(code: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    const lines = code.split('\n');

    for (const line of lines) {
      const lineTokens = this.highlightCSSLine(line);
      tokens.push(...lineTokens);
      tokens.push({ text: '\n', type: 'default' });
    }

    return tokens;
  }

  private static highlightTypeScriptLine(line: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inMultiLineComment = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      // Handle multi-line comments
      if (char === '/' && nextChar === '*' && !inString && !inComment) {
        if (current) {
          tokens.push(...this.tokenizeTypeScriptText(current));
          current = '';
        }
        inMultiLineComment = true;
        tokens.push({ text: '/*', type: 'comment' });
        i++;
        continue;
      }

      if (char === '*' && nextChar === '/' && inMultiLineComment) {
        inMultiLineComment = false;
        tokens.push({ text: '*/', type: 'comment' });
        i++;
        continue;
      }

      if (inMultiLineComment) {
        tokens.push({ text: char, type: 'comment' });
        continue;
      }

      // Handle single-line comments
      if (char === '/' && nextChar === '/' && !inString) {
        if (current) {
          tokens.push(...this.tokenizeTypeScriptText(current));
          current = '';
        }
        tokens.push({ text: line.substring(i), type: 'comment' });
        break;
      }

      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && !inString) {
        if (current) {
          tokens.push(...this.tokenizeTypeScriptText(current));
          current = '';
        }
        inString = true;
        stringChar = char;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (char === stringChar && inString) {
        inString = false;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (inString) {
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      // Handle operators and special characters
      if (this.isTypeScriptOperator(char)) {
        if (current) {
          tokens.push(...this.tokenizeTypeScriptText(current));
          current = '';
        }
        tokens.push({ text: char, type: 'operator' });
        continue;
      }

      current += char;
    }

    if (current) {
      tokens.push(...this.tokenizeTypeScriptText(current));
    }

    return tokens;
  }

  private static highlightHTMLLine(line: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    let current = '';
    let inTag = false;
    let inAttribute = false;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      // Handle HTML tags
      if (char === '<' && !inString) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        inTag = true;
        tokens.push({ text: char, type: 'keyword' });
        continue;
      }

      if (char === '>' && inTag && !inString) {
        inTag = false;
        inAttribute = false;
        tokens.push({ text: char, type: 'keyword' });
        continue;
      }

      // Handle strings in attributes
      if ((char === '"' || char === "'") && inTag && !inString) {
        inString = true;
        stringChar = char;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (char === stringChar && inString) {
        inString = false;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (inString) {
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      // Handle attributes
      if (char === '=' && inTag && !inAttribute) {
        if (current) {
          tokens.push({ text: current, type: 'function' });
          current = '';
        }
        inAttribute = true;
        tokens.push({ text: char, type: 'operator' });
        continue;
      }

      if (char === ' ' && inTag && !inAttribute) {
        if (current) {
          tokens.push({ text: current, type: 'keyword' });
          current = '';
        }
        tokens.push({ text: char, type: 'default' });
        continue;
      }

      if (inTag) {
        current += char;
      } else {
        tokens.push({ text: char, type: 'default' });
      }
    }

    if (current) {
      tokens.push({ text: current, type: inTag ? 'keyword' : 'default' });
    }

    return tokens;
  }

  private static highlightCSSLine(line: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      // Handle strings
      if ((char === '"' || char === "'") && !inString) {
        if (current) {
          tokens.push(...this.tokenizeCSSText(current));
          current = '';
        }
        inString = true;
        stringChar = char;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (char === stringChar && inString) {
        inString = false;
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      if (inString) {
        tokens.push({ text: char, type: 'string' });
        continue;
      }

      // Handle operators and special characters
      if (this.isCSSOperator(char)) {
        if (current) {
          tokens.push(...this.tokenizeCSSText(current));
          current = '';
        }
        tokens.push({ text: char, type: 'operator' });
        continue;
      }

      current += char;
    }

    if (current) {
      tokens.push(...this.tokenizeCSSText(current));
    }

    return tokens;
  }

  private static tokenizeTypeScriptText(text: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    const words = text.split(/(\s+)/);

    for (const word of words) {
      if (this.typescriptKeywords.includes(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (word.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/)) {
        tokens.push({ text: word.replace('(', ''), type: 'function' });
        tokens.push({ text: '(', type: 'operator' });
      } else if (word.match(/^\s+$/)) {
        tokens.push({ text: word, type: 'default' });
      } else {
        tokens.push({ text: word, type: 'default' });
      }
    }

    return tokens;
  }

  private static tokenizeCSSText(text: string): HighlightedToken[] {
    const tokens: HighlightedToken[] = [];
    const words = text.split(/(\s+)/);

    for (const word of words) {
      if (this.cssKeywords.includes(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (word.match(/^\s+$/)) {
        tokens.push({ text: word, type: 'default' });
      } else {
        tokens.push({ text: word, type: 'default' });
      }
    }

    return tokens;
  }

  private static isTypeScriptOperator(char: string): boolean {
    return '{}[]()<>:;,.=+-*/%&|!?~^'.includes(char);
  }

  private static isCSSOperator(char: string): boolean {
    return '{}[]():;,.=+-*/%'.includes(char);
  }

  static getTokenClassName(token: HighlightedToken): string {
    switch (token.type) {
      case 'keyword':
        return 'text-blue-600 font-semibold';
      case 'string':
        return 'text-green-600';
      case 'comment':
        return 'text-gray-500 italic';
      case 'function':
        return 'text-purple-600 font-medium';
      case 'operator':
        return 'text-gray-700';
      default:
        return 'text-gray-900';
    }
  }

  static renderHighlightedCode(tokens: HighlightedToken[]): React.ReactElement[] {
    return tokens.map((token, index) => (
      <span key={index} className={this.getTokenClassName(token)}>
        {token.text}
      </span>
    ));
  }
} 