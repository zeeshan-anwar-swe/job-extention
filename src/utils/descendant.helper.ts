import { Descendant, Element, Text, BaseElement } from 'slate';

// Define a custom type for your paragraph elements that extends BaseElement.
// This is the recommended way to handle custom node types in Slate.
export interface ParagraphElement extends BaseElement {
  type: 'p';
  children: Descendant[];
}

function isDescendantArray(value: any): value is Descendant[] {
  return Array.isArray(value) && value.every(item => typeof item === 'object' && item !== null);
}

function isJsonDescendantArray(value: string): boolean {
  try {
    const parsed = JSON.parse(value);
    return isDescendantArray(parsed);
  } catch (e) {
    return false;
  }
}

function createDescendantArrayFromText(text: string): Descendant[] {
  // Use the custom ParagraphElement type here.
  return [{
    type: 'p',
    children: [{ text: text }],
  } as ParagraphElement];
}

export function createDescendants(input: string | Descendant[]): Descendant[] {
  if (isDescendantArray(input)) {
    return input;
  }

  if (typeof input === 'string') {
    if (isJsonDescendantArray(input)) {
      try {
        return JSON.parse(input) as Descendant[];
      } catch (e) {
        return createDescendantArrayFromText(input);
      }
    }

    return createDescendantArrayFromText(input);
  }

  // Use the custom ParagraphElement type here as well.
  return [{
    type: 'p',
    children: [{ text: '' }],
  } as ParagraphElement];
}