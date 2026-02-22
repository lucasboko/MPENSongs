import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { Placeholder } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';

import { HiBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";

const MenuBar = ({ editor }: { editor: Editor | null }) => {

  if (!editor) {
    return null
  }
  
  return (
    <div className="bg-white z-30 absolute right-[10px] flex flex-col items-center text-center w-[20px] p-[15px] menu-bar shadow-xs/10 rounded-full gap-[10px]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active cursor-pointer' : 'cursor-pointer'}
      >
        <HiBold className={editor.isActive('bold') ? 'text-blue-500' : ''} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active cursor-pointer' : 'cursor-pointer'}
      >
        <FaItalic className={editor.isActive('italic') ? 'text-blue-500' : ''} />
      </button>
    </div>
  )
}


export const TipTapEditor = ({
  content, transltorContent, hideSettings, handleChange, editable, bottomMargin
}: {
  content: string | false | undefined,
  transltorContent?: string | false | undefined,
  hideSettings?: boolean, 
  editable?: boolean,
  handleChange?: (value: string, fieldName: string) => void
  bottomMargin?: number
}) => {

  const [height, setHeigh] = useState(window.innerHeight - (bottomMargin || 0));
  useEffect(() => {
    window.addEventListener('resize', () => setHeigh(window.innerHeight - (bottomMargin || 0)));
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Saisir les paroles ici...',
      }),
    ],
    editable: editable,
    content: content || '',
    onUpdate: ({ editor }) => handleChange ? handleChange(editor.getHTML(), 'lyrics') : {},
  })

  useEffect(() => {
    if (transltorContent)
      editor?.commands.setContent(transltorContent?.toString() || '');
  }, [transltorContent, editor]);
  
  return (
    <div className='relative'>
      {(!hideSettings && editable) && <MenuBar editor={editor} />}
      <div className=" bg-white overflow-y-scroll pr-[30px]" 
        style={{ height: `${height}px`, scrollbarWidth: 'thin', scrollbarColor: '#eee white' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}