// utils/formatDate.js
const formatDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    const parts = d.split(' ');
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
};

export default formatDate;
