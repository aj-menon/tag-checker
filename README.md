# Tag Checker

## Introduction

Markup languages such as HTML use tags to highlight sections with special significance. In this way, a sentence
in boldface can be indicated thus:

    <B>This is a sentence in boldface</B>

Typically every tag has an opening tag of the form `<TAG>` and a closing tag of the form `</TAG>`, so that portions
of text can be bracketed as above. Tags can then be combined to achieve more than one effect on a particular piece
of text simply by nesting them properly, for instance:

    `<CENTER><B>This text is centred and in boldface</B></CENTER>`

## The Problem

Two of the most common mistakes when tagging text are:

- Getting the nesting wrong:
  `<B><CENTER>This should be centred boldface, but the tags are wrongly nested</B></CENTER>`
- Forgetting a tag:
  `<B><CENTER>This should be centred boldface, but there is a missing tag</CENTER>`

  This program checks that all the tags ina given piece of text (a paragraph) are correctly nested,a nd that there are no missing ot extra tags.
  An opening tag in this problem:

  1. is enclosed by angle brackets
  2. contains only one upper case letter (For example:`<T>, <X>,<S>`)

  The closing tag will be the same letter preceeded by the symbol `/`. ( For example: from the above, the closing tags would be `</T>,</X>,</S>`)

  The following outputs are expected of the program:

1. If the paragraph is correctly tagged then output the line **“Correctly tagged paragraph”**, otherwise output a line of
   the form **“Expected `<expected>` found `<unexpected>`”** where `<expected>` is the closing tag matching the most
   recent unmatched tag and `<unexpected>` is the closing tag encountered.
2. If either of these is the end of paragraph,
   i.e. there is either an unmatched opening tag or no matching closing tag at the end of the paragraph, then replace
   the tag or closing tag with `#`.

## Technologies used

JavaScript and ReactJS

## Installation

- Install the latest of version `Node.js` from [here](https://nodejs.org/en/) for local development of this project.

* Install dependencies

  ```
  cd <project-root-folder>
  npm install
  ```

### Build and Run

```
npm start
```
