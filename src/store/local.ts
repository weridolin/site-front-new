// 存储数据到本地存储并设置过期时间（秒为单位）
export function setLocalStorageWithExpiration(key: string, value: any, expirationSeconds: number) {
    const expirationMS = expirationSeconds * 1000;
    const expirationTime = new Date().getTime() + expirationMS;
  
    const data = {
      value: value,
      expirationTime: expirationTime,
    };
  
    localStorage.setItem(key, JSON.stringify(data));
  }
  
// 从本地存储中获取数据，如果数据过期则返回 null
export function getLocalStorageWithExpiration(key: string) {
	const storedData = localStorage.getItem(key);

	if (storedData) {
		const data = JSON.parse(storedData);
		const currentTime = new Date().getTime();

		if (currentTime < data.expirationTime) {
			return data.value;
		} else {
			localStorage.removeItem(key);
		}
	}

	return null;
}
