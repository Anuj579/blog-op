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
                plugins: 'lists advlist autolink link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table',
                toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
            }}
        />
    );
};

export default BlogEditor;
