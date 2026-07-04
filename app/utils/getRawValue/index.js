function getRawValue(obj, keyPath) {
    return keyPath.split(".").reduce((acc, k) => acc?.[k], obj) ?? "";
}

export { getRawValue };