import React, { useMemo, useRef, useEffect } from 'react'
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react'
import {
  Editor,
  Text,
  createEditor,
  Range,
  BaseEditor,
} from 'slate'
import {
  Card,
  Stack,
  CardHeader,
  Typography,
  FormControl,
  Box
} from '@mui/material';
import Meta from '@/components/Meta';
import { LoadingButton } from '@mui/lab';
import { css } from '@emotion/css'
import { withHistory } from 'slate-history'
import FormatBoldIcon from '@mui/icons-material/FormatBold';

import { Button, Icon, Menu, Portal } from '../components/layouts/HoveringToolbar/slateComponents'

const HoveringMenuExample = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

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
    <Slate editor={editor} initialValue={initialValue}>
      <HoveringToolbar />
      <Editable
        renderLeaf={props => <Leaf {...props} />}
        placeholder="Enter some text..."
        onDOMBeforeInput={(event: InputEvent) => {
          switch (event.inputType) {
            case 'B':
              event.preventDefault()
              return toggleMark(editor, 'bold')
            case 'I':
              event.preventDefault()
              return toggleMark(editor, 'italic')
            case 'U':
              event.preventDefault()
              return toggleMark(editor, 'underlined')
          }
        }}
        style={{
           minHeight: '200px', width: '520px'
        }}
      />
    </Slate>
    <Box sx={{  p:'100px' }}>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined" >
                    <LoadingButton
                      variant="contained"
                    >
                      Proceed
                    </LoadingButton>
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <LoadingButton
                      variant="contained"
                    >
                      Skip
                    </LoadingButton>
            </FormControl>
        </Box>
      </Card>
    </Stack>
  )
}

const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>()
  const editor = useSlate()
  const inFocus = useFocused()

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        onMouseDown={(e: { preventDefault: () => void }) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault()
        }}
      >
        <FormatButton format="bold" icon="B" />
        <FormatButton format="italic" icon="I" />
        <FormatButton format="underlined" icon="U" />
      </Menu>
    </Portal>
  )
}

const FormatButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      reversed
      active={isMarkActive(editor, format)}
      onClick={() => toggleMark(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>

  )
}
interface CustomText extends Text {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

type CustomElement = {
  type: 'paragraph';
  children: CustomText[];
};


const initialValue: CustomElement[] = [

  {
    type: 'paragraph',
    children: [
      { text: '', bold: false, italic: false },
    ],
  }
]

export default HoveringMenuExample