import React, { useMemo, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
const INIT = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
];
const serialize = (node) => {
  return JSON.stringify(node);
};

// const deserialize = (string) => {
//   return JSON.parse(string);
// };
// const stringify = (node) => {
//   if (node instanceof Array) {
//     return node.map((n) => stringify(n)).join('');
//   }

//   if (node.children) {
//     const child = node.children.map((n) => stringify(n)).join('');
//     if (node.type == 'paragraph') {
//       return child + '\n';
//     } else {
//       return child;
//     }
//   }

//   return Node.string(node);
// };
const SlateTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(INIT);
  // const submit = async () => {
  //   const data = localStorage.getItem('content');
  //   console.log(deserialize(data));
  //   await axios.post(
  //     '/api/posts/',
  //     { content: { children: deserialize(data) } },
  //     { headers: { Authorization: 'Bearer' } }
  //   );
  //   Transforms.deselect(editor);
  //   setValue(INIT);
  // };

  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(v) => {
          setValue(v);
          localStorage.setItem('content', serialize(value));
          // console.log(stringify(value));
        }}
      >
        <Editable
          placeholder="Start here"
          autoFocus
          // onKeyDown={(event) => {}}
        />
      </Slate>
    </div>
  );
};
export default SlateTextEditor;
