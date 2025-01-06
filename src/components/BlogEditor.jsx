import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';

const BlogEditor = ({ value, onEditorChange }) => {
    const { theme } = useTheme()
    
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={value}
            onEditorChange={onEditorChange}
            init={{
                height: 500,
                menubar: false,
                skin: "oxide-dark",
                content_css: "dark",
                // plugins: [
                //     'advlist autolink lists link image charmap preview anchor',
                //     'searchreplace visualblocks code fullscreen',
                //     'insertdatetime media table paste code help wordcount',
                // ],
                // toolbar:
                //     'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
                // content_style:
                //     'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
    );
};

export default BlogEditor;
