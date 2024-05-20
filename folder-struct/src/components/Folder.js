import { useState } from "react";

const FolderStr = ({ deleteExistingNode, handleInsertNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
    setShowInput({ ...showInput, visible: false });
  };

  const removeFolder = (folderId) => {
    deleteExistingNode(folderId);
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div style={{ marginTop: 5 }}>
          <div className="folder" onClick={() => setExpand(!expand)}>
            <span>📁{explorer.name}</span>
            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>+ 📁</button>
              <button onClick={(e) => handleNewFolder(e, false)}>+ 📄</button>
              <button onClick={() => removeFolder(explorer.id)}>Delete</button>
              <button>Update</button>
            </div>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((e, i) => {
            return (
                <FolderStr
                key={i}
                  deleteExistingNode={deleteExistingNode}
                  handleInsertNode={handleInsertNode}
                  explorer={e}
                />
           
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name} </span>;
  }
};

export default FolderStr;
