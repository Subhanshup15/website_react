import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useCachedFetch(url, cacheKey) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    // ✅ Check Cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // ✅ Fetch from API
    const res = await api.get(url);
    setData(res.data);

    // ✅ Store Cache
    localStorage.setItem(cacheKey, JSON.stringify(res.data));
    setLoading(false);
  };

  // Load on mount
  useEffect(() => {
    load();
  }, []);

  // ✅ Method to refresh cache manually
  const refresh = async () => {
    localStorage.removeItem(cacheKey);
    await load();
  };

  return { data, setData, loading, refresh };
}
