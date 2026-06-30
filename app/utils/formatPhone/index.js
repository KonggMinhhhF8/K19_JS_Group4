function formatPhone(phone) {
    // Đảm bảo là chuỗi
    const str = String(phone);

    // Lấy 4 số đầu
    const part1 = str.slice(0, 4);

    // Lấy 3 số tiếp theo
    const part2 = str.slice(4, 7);

    // Trả về dạng che số
    return `${part1}.${part2}.xxx`;
}

export { formatPhone }