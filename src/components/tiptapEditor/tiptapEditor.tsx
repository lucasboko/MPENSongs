import { Editor, EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { Placeholder } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';

import { HiBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";


export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // Text formatting
    isBold: ctx.editor.isActive('bold') ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive('italic') ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
  }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>

const MenuBar = ({ editor }: { editor: Editor | null }) => {

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="bg-white absolute right-[-10px] flex flex-col items-center text-center w-[20px] p-[15px] menu-bar shadow-xs/20 rounded-full gap-[10px]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState?.canBold}
        className={editorState?.isBold ? 'is-active' : ''}
      >
        <HiBold className={editorState?.isBold ? 'text-blue-500' : ''} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState?.canItalic}
        className={editorState?.isItalic ? 'is-active' : ''}
      >
        <FaItalic className={editorState?.isItalic ? 'text-blue-500' : ''} />
      </button>
    </div>
  )
}


export const TipTapEditor = ({
  content, transltorContent, hideSettings, handleChange, readOnly
}: {
  content: string | false | undefined,
  transltorContent?: string | false | undefined,
  hideSettings?: boolean, readOnly?: boolean,
  handleChange?: (value: string, fieldName: string) => void
}) => {

  const [height, setHeigh] = useState(window.innerHeight - 120);
  useEffect(() => {
    window.addEventListener('resize', () => setHeigh(window.innerHeight - 120));
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Saisir les paroles ici...',
      }),
    ],
    editable: !readOnly,
    content: content || '',
    onUpdate: ({ editor }) => handleChange ? handleChange(editor.getHTML(), 'lyrics') : {},
  })

  useEffect(() => {
    if (transltorContent)
      editor?.commands.setContent(transltorContent?.toString() || '');
  }, [transltorContent, editor]);
  
  return (
    <div className='relative'>
      {!hideSettings && <MenuBar editor={editor} />}
      <div className="text-xs bg-white overflow-y-scroll mt-[15px]" 
        style={{ height: `${height}px`, scrollbarWidth: 'thin', scrollbarColor: '#eee white' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}