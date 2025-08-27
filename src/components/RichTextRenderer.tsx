import React from "react"
import type { Descendant, Text } from "slate"
import { BaseElement } from "slate";

interface SlateRendererProps {
  content: Descendant[]
  className?: string
}

// Define the custom element types that include a 'type' property.
// This is the core of the fix.
export type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | CodeBlockElement
  | LinkElement
  | ImageElement
  | HorizontalRuleElement;

// Define a type for a union of all custom text types
export type CustomText = FormattedText;

// Define individual element types.
interface ParagraphElement extends BaseElement {
  type: "paragraph";
  children: CustomText[];
}

interface HeadingOneElement extends BaseElement {
  type: "heading-one";
  children: CustomText[];
}

interface HeadingTwoElement extends BaseElement {
  type: "heading-two";
  children: CustomText[];
}

interface HeadingThreeElement extends BaseElement {
  type: "heading-three";
  children: CustomText[];
}

interface HeadingFourElement extends BaseElement {
  type: "heading-four";
  children: CustomText[];
}

interface HeadingFiveElement extends BaseElement {
  type: "heading-five";
  children: CustomText[];
}

interface HeadingSixElement extends BaseElement {
  type: "heading-six";
  children: CustomText[];
}

interface BlockQuoteElement extends BaseElement {
  type: "block-quote";
  children: CustomText[];
}

interface BulletedListElement extends BaseElement {
  type: "bulleted-list";
  children: CustomText[];
}

interface NumberedListElement extends BaseElement {
  type: "numbered-list";
  children: CustomText[];
}

interface ListItemElement extends BaseElement {
  type: "list-item";
  children: CustomText[];
}

interface CodeBlockElement extends BaseElement {
  type: "code-block";
  children: CustomText[];
}

interface LinkElement extends BaseElement {
  type: "link";
  url: string;
  children: CustomText[];
}

interface ImageElement extends BaseElement {
  type: "image";
  url: string;
  alt: string;
  children: CustomText[];
}

interface HorizontalRuleElement extends BaseElement {
  type: "horizontal-rule";
  children: CustomText[];
}

// Update the FormattedText interface to ensure it extends Text and has a type property.
// This is necessary to make the isText type guard work correctly.
interface FormattedText extends Text {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

// Type guards to check node types with the new custom types
const isText = (node: Descendant): node is FormattedText => {
  return "text" in node;
}

const isElement = (node: Descendant): node is CustomElement => {
  return "children" in node && "type" in node;
}

// Component to render individual text nodes with formatting
const RenderText: React.FC<{ node: FormattedText }> = ({ node }) => {
  let text = <span>{node.text}</span>

  if (node.bold) {
    text = <strong>{text}</strong>
  }

  if (node.italic) {
    text = <em>{text}</em>
  }

  if (node.underline) {
    text = <u>{text}</u>
  }

  if (node.strikethrough) {
    text = <s>{text}</s>
  }

  if (node.code) {
    text = <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{text}</code>
  }

  return text
}

// Component to render element nodes
const RenderElement: React.FC<{ element: CustomElement }> = ({ element }) => {
  const children = element.children.map((child, index) => <RenderNode key={index} node={child} />)

  switch (element.type) {
    case "paragraph":
      return <p className="mb-4 leading-relaxed">{children}</p>

    case "heading-one":
      return <h1 className="text-3xl font-bold mb-6 text-balance">{children}</h1>

    case "heading-two":
      return <h2 className="text-2xl font-semibold mb-4 text-balance">{children}</h2>

    case "heading-three":
      return <h3 className="text-xl font-semibold mb-3 text-balance">{children}</h3>

    case "heading-four":
      return <h4 className="text-lg font-semibold mb-2 text-balance">{children}</h4>

    case "heading-five":
      return <h5 className="text-base font-semibold mb-2 text-balance">{children}</h5>

    case "heading-six":
      return <h6 className="text-sm font-semibold mb-2 text-balance">{children}</h6>

    case "block-quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700">{children}</blockquote>
      )

    case "bulleted-list":
      return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>

    case "numbered-list":
      return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>

    case "list-item":
      return <li className="leading-relaxed">{children}</li>

    case "code-block":
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="font-mono text-sm">{children}</code>
        </pre>
      )

    case "link":
      return (
        <a
          href={element.url}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )

    case "image":
      return (
        <div className="mb-4">
          <img
            src={element.url || "/placeholder.svg"}
            alt={element.alt || "Image"}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )

    case "horizontal-rule":
      return <hr className="border-gray-300 my-6" />

    default:
      // Fallback for unknown element types
      return <div className="mb-4">{children}</div>
  }
}

// Main component to render any Slate node
const RenderNode: React.FC<{ node: Descendant }> = ({ node }) => {
  if (isText(node)) {
    return <RenderText node={node} />
  }

  if (isElement(node)) {
    return <RenderElement element={node} />
  }

  return null
}

// Main SlateRenderer component
export const SlateRichTextRenderer: React.FC<SlateRendererProps> = ({ content, className = "" }) => {
  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {content.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

export default SlateRichTextRenderer;