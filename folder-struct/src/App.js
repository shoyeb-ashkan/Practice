import "./App.css";
import FolderStr from "./components/Folder";
import useTraverseTree from "./components/hook/use-traverse-tree";
import explorerData from "./data/data";
import { useState } from "react";

function App() {
  const [explorer, setExplorer] = useState(explorerData);
  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorer(finalTree);
  };

  const deleteExistingNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);

    setExplorer(finalTree);
  };
  return (
    <div className="App">
      <FolderStr
        deleteExistingNode={deleteExistingNode}
        handleInsertNode={handleInsertNode}
        explorer={explorer}
      />
    </div>
  );
}

export default App;
