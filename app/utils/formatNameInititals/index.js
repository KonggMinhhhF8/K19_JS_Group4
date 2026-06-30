function formatNameInitials(fullName) {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    const firstLetter = parts[0][0];
    const lastLetter = parts[parts.length - 1][0];

    return (firstLetter + lastLetter).toUpperCase();
}

export { formatNameInitials }