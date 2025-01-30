import { Editor } from '@tinymce/tinymce-react';

const BlogEditor = ({ value, onEditorChange, disabled }) => {

    return (
        <Editor
            disabled={disabled}
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
