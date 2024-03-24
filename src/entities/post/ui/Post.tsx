import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../model/slice";
import { Button, Text } from "@/shared/ui";

export const Post = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetPostQuery(id);

  const navigate = useNavigate();
  const onGoBackHandler = () => navigate(-1);

  let content;

  if (isLoading) content = <Text>Loading...</Text>;
  if (isError) content = <Text>Error</Text>;
  if (isSuccess)
    content = (
      <>
        <Text type="title">{data.id}</Text>
        <Text type="title">{data.title}</Text>
        <Text>{data.body}</Text>
        <Button onClick={onGoBackHandler}>Go back</Button>
      </>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        maxWidth: "50%",
        margin: "0 auto",
        textAlign: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {content}
    </div>
  );
};
