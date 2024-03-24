import { MinifiedPost, useLazyGetPostsQuery } from "@/entities/post";
import { useEffect, useRef } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from "react-virtualized";

const getCache = () =>
  new CellMeasurerCache({
    fixedWidth: true,
  });

const initialCache = getCache();

type Props = {
  height?: string;
};

export const InfinitePostsList = ({ height = "100vh" }: Props) => {
  const [getPosts, { data = [] }] = useLazyGetPostsQuery();

  useEffect(() => {
    getPosts({ startIndex: 0, stopIndex: 25 });
  }, [getPosts]);

  const cacheRef = useRef<CellMeasurerCache>(initialCache);

  useEffect(() => {
    const createNewCache = () => {
      cacheRef.current = getCache();
    };
    window.addEventListener("resize", createNewCache);
    return () => {
      window.removeEventListener("resize", createNewCache);
    };
  }, []);

  return (
    <div style={{ height }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <InfiniteLoader
              isRowLoaded={({ index }) => !!data[index]}
              loadMoreRows={({ startIndex, stopIndex }) => {
                if (startIndex <= 75) {
                  return getPosts({ startIndex, stopIndex }).unwrap();
                }
                return Promise.resolve();
              }}
              rowCount={100}
              minimumBatchSize={26}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  width={width}
                  height={height}
                  deferredMeasurementCache={cacheRef.current}
                  rowHeight={cacheRef.current.rowHeight}
                  rowCount={data.length}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={({ index, key, style, parent }) => (
                    <CellMeasurer
                      key={key}
                      cache={cacheRef.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                      ref={registerChild}
                    >
                      {({ registerChild }) => (
                        <MinifiedPost
                          post={data[index]}
                          style={style}
                          key={key}
                          ref={registerChild as (el: HTMLDivElement) => void}
                        />
                      )}
                    </CellMeasurer>
                  )}
                />
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </div>
  );
};
