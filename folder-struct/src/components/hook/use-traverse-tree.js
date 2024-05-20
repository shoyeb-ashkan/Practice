const useTraverseTree = () => {
  // Add a file or folder in tree
  // Can be optimised using Dynamic Programming
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, folderId){
    //   let newtree=tree
    //  for (let k in tree) {
    //   const element = tree;
    //   console.log(element)
    //   if(element.id===folderId){
    //     tree.splice(i,1)
    //     return true
    //   }else if(tree.items && tree.items.length>0){
    //     const deleted = deleteNode(tree.items, folderId)
    //     if(deleted){
    //       return true
    //     }
    //   }
    // }
    // return false;

   
    
  };

  const renameNode = () => {}; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
