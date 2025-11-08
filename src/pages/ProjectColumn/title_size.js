function title_size(title) {
    const length = title.length;
    if (length < 15) return "XL";
    else if (length < 30) return "L";
    else if (length < 60) return "M";
    else if (length < 90) return "S";
    else return "XS";
} 
export default title_size; 