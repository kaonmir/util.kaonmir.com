import Widget from "@/components/widgets/base/Widget";
import React, { useEffect } from "react";

export default function InspirationalQuotesWidget() {
  const [quote, setQuote] = React.useState<string>("");
  const [author, setAuthor] = React.useState<string>("");

  useEffect(() => {
    fetch("/api/zenquotes")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        }
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }, []);

  return (
    <Widget description="Inspirational Quotes">
      <p className="text-xl text-center">&quot;{quote}&quot;</p>
      <p className="text-md text-center mt-3">- {author}</p>
    </Widget>
  );
}
