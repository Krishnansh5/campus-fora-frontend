import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Card,
  Stack,
  CardHeader,
  Typography,
  FormControl,
  Grid,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Meta from '@/components/Meta';

import { Button, Icon, Toolbar } from "./components";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextExample = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
    >
      <Meta />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: '10px',
          maxHeight: '80vh',
          width: { xs: '330px', sm: '600px', margin: '10px auto' }
        }}
      >
        <CardHeader
            title={
              <Typography variant="h2" component="div">
                Bio 
              </Typography>
            }
          />
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Toolbar>
            <MarkButton format="bold" icon="Bold"/>
            <MarkButton format="italic" icon=" Italic " />
            <MarkButton format="underline" icon=" Underlined " />
            <MarkButton format="code" icon="Code" />
            {/* <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" /> */}
            <BlockButton format="block-quote" icon=" Quote " />
            {/* <BlockButton format="numbered-list" icon="Numbered List" /> */}
            <BlockButton format="bulleted-list" icon=" Bulleted List " />
          </Toolbar>
          <Box sx={{ ml: '1px', p:'10px' }}>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter your bio here…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                  for (const hotkey in HOTKEYS) {
                    if (isHotkey(hotkey, event)) {
                      event.preventDefault();
                      const mark = HOTKEYS[hotkey];
                      toggleMark(editor, mark);
                    }
                  }
                }}
              />
          </Box>
        </Slate>
        <Box sx={{  p:'100px' }}>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined" >
                    <LoadingButton
                      // loading={loading}
                      variant="contained"
                      // onClick={handleSubmit(onSignup)}
                    >
                      Proceed
                    </LoadingButton>
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <LoadingButton
                      // loading={loading}
                      variant="contained"
                      // onClick={handleSubmit(onSignup)}
                    >
                      Skip
                    </LoadingButton>
            </FormControl>
        </Box>
      </Card>
    </Stack>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {text: ''}
    ]
  }
];

export default RichTextExample;
