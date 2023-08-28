import React from "react";
import styles from "./index.module.scss";
import { Button } from "devextreme-react/button";
import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";

type AppProps = { num: number };

export const App = ({ num }: AppProps) => (
  <>
    <h1 className={styles.h1}>Total Number: {num}</h1>
    <Button
      text="Click"
      elementAttr={{
        class: styles.button,
      }}
      icon="export"
    />
    <DataGrid showBorders showRowLines dataSource={[]}>
      <Column caption="test" />
      <Column caption="test1" />
    </DataGrid>
  </>
);
