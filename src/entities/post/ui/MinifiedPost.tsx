import { CSSProperties, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../model/types";
import { Button, Text } from "@/shared/ui";

type Props = {
  post: Post;
  style?: CSSProperties;
};

export const MinifiedPost = forwardRef<HTMLDivElement, Props>(
  ({ post: { body, id, title }, style }, ref) => {
    const navigate = useNavigate();

    const goToPost = () => navigate(`/${id}`);

    return (
      <div
        style={{
          paddingBottom: "30px",
          ...style,
        }}
        ref={ref}
      >
        <div
          style={{
            backgroundColor: "#9fd3c7",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            color: "#385170",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <Text
              type="title"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >{`${id} ${title} ${body}`}</Text>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Button onClick={goToPost}>See details</Button>
          </div>
        </div>
      </div>
    );
  }
);
