import { useState, useEffect } from "react";

export default function useInfiniteScroll(callback) {
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading || isComplete) return;
    callback();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isComplete]);

  function scrollDown() {
    const scrollTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;
    const endPoint = clientHeight + scrollTop;
    if (offsetHeight !== endPoint || isComplete) return;
    setLoading(true);
  }

  return { loading, setLoading, isComplete, setIsComplete };
}
