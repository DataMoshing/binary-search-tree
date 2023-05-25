class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        // Remove duplicate elements from array and sort array in ascending order for bst.
        const sortedArray = [...new Set(arr)].sort((a, b) => a - b)
        // Set root node of tree with balanced binary search tree.
        this.root = this.buildTree(sortedArray)
    }
    buildTree(sortedArray) {
        // If no elements in array return null (empty tree).
        if (sortedArray.length === 0)
            return null

        // Get the middle element of sorted array by dividing length of array by 2.
        let mid = parseInt((sortedArray.length) / 2)
        // New Node instance is created with the element at `mid` index of sorted array. 
        let node = new Node(sortedArray[mid])

        // Left substree constructed by recursively calling buildTree from beginning to element before `mid` index.
        node.left = this.buildTree(sortedArray.slice(0, mid))
        // Right subtree is also constructed with recursion after `mid` index to the right property of current node.
        node.right = this.buildTree(sortedArray.slice(mid + 1))

        return node
    }
    insert(value, node = this.root) {
        // If node is null tree is empty.
        if (node === null) {
            // Create a new instance of Node with the given value and return.
            return new Node(value)
        }
        // If current node is not null and is equal to value of current node (value already exists in tree) return current node.
        if (node.data === value)
            return node

        // If value greater than current node's value insert new value in right subtree.
        if (node.data < value) {
            node.right = this.insert(value, node.right)
        } else {
            // If value less than current node's value insert new value to left subtree.
            node.left = this.insert(value, node.left)
        }
        // Returns updated node updating the subtree.
        return node
    }
    // Set node to head node.
    minValue(node = this.root) {
        // Check if left child of node is null which means have reached the leftmost node in subtree - minimum value.
        if (!node.left) {
            // Return node value when leftmost value is found.
            return node.value
        } else {
            // Recursively call minValue until minimum value is found.
            return this.minValue(node.left)
        }
    }
    delete(value) {
        // Assign the result of deleteNode to the root property of tree, calling the deleteNode method with specified value and current root node as arguments.
        this.root = this.deleteNode(value, this.root);
    }
    deleteNode(value, node = this.root) {
        if (node === null)
            return node;

        // Check node data with value to check which subtree to traverse. If value is greater than subtree the desired value is in the right subtree.
        if (node.data < value) {
            // Recursively call deleteNode with the value and assign the result to node.right. Updating the right child after deletion.
            node.right = this.deleteNode(value, node.right);
            // If value is less than node.data it means desired value is in left subtree. 
        } else if (value < node.data) {
            // Recursively calling deleteNode with the value and assign the result to node.left.
            node.left = this.deleteNode(value, node.left);
        } else {
            // If node to be deleted has no children return null.Removing node from tree.
            if (!node.left && !node.right) {
                return null;
            }
            // Check if node has one child (left) if true it means there is no left child but has a right child. Return right child to replace current node.
            if (!node.left) {
                return node.right;
                // Check if the current node has only one child (right child) if true it means current node has no right child but a left child. Return the left child to replace the current node in tree.
            } else if (!node.right) {
                return node.left;
            }
            // If node to be deleted has both left and right children find the minimum value in right subtree and assign it to node.data.
            const minVal = this.minValue(node.right);
            node.data = minVal
            // After updaing node.data recursively call deleteNode with minimum value as the value and the right child of the current node and assign updated child to node.right.
            node.right = this.deleteNode(minVal, node.right);
        }
        // Return update node structure after deletion.
        return node;
    }
    find(value, node = this.root) {
        // Check if current node is null or matches target value if true node has been found and return current node.
        if (node === null || node.data === value)
            return node
        // If value is less than data of current node then value might be in left subtree, recursively call find to find data of the node in left subtree.
        else if (value < node.data)
            return this.find(value, node.left)
        else
            // If value greater than data of current node then value might be in right subtree of current node. Continue to search sight subtree until value is found.
            return this.find(value, node.right)
    }
    // arr is used to store visited nodes, queue is used to keep track of nodes visited, root is current node being processed.
    levelOrder(arr = [], queue = [], root = this.root) {
        // If tree is empty return null.
        if (root === null)
            return null
        // If root is not null push value to arr adding current node to arr in level-order traversal.
        arr.push(root.data)

        // The left and right child nodes are added to queue array.  The children of current node are queued so they can be processed later.
        queue.push(root.left)
        queue.push(root.right)

        // While there are nodes in queue array to be processed.
        while (queue.length) {
            // First node to be visited assign to level variable.
            const level = queue[0]
            // First node is removed or dequeued, the node has been visited and will have the children enqueued for processing.
            queue.shift()
            // levelOrder is called recursively continuing level-order traversal by processing current node's children.
            this.levelOrder(arr, queue, level)
        }
        // When there are no more nodes in queue traversal is complete and resulting arr array is returned with values of binary tree in level-order.
        return arr
    }
    // arr array is used to store visited node values inorder traversal.
    inorder(arr = [], node = this.root) {
        // If current node is null subtree is empty, return null.
        if (node === null)
            return null

        // If node has left child recursively call inorder with arr and left child traversing left subtree of current node visiting all nodes left side before processing current node.
        if (node.left) {
            this.inorder(arr, node.left)
        }
        // After traversing left subtree, the value of current node is pushed in arr ensuring inorder traversal order.
        arr.push(node.data)

        // Check if node has right children and recursively call inorder with arr and right child as parameters, traversing right subtree of current node after processing left side.
        if (node.right) {
            this.inorder(arr, node.right)
        }
        // Return arr containing values of binary tree in inorder traversal order.
        return arr
    }
    // arr is used to store visited node values in preorder traversal order.
    preorder(arr = [], node = this.root) {
        // If node is null it means current subtree is empty.
        if (node === null)
            return null
        // Push value of current node to arr array ensuring the resulting array is in preorder traversal order.
        arr.push(node.data)

        // If node has left child, recursively call preorder with arr and left child as parameters. Traversing left subtree of current node visiting all nost on left side.
        if (node.left) {
            this.preorder(arr, node.left)
        }
        // Same as the left subtree but on the right.
        if (node.right) {
            this.preorder(arr, node.right)
        }
        // Return the resulting arr array containing values of binary tree in preorder traversal order.
        return arr
    }
    // arr used to store visited values in postorder traversal order.
    postorder(arr = [], node = this.root) {
        // If node is null meaning current subtree is empty return null.
        if (node === null) {
            return null
        }
        // If node has left child recursively call postorder with arr array and left child as parameters. Traversing left subtree and visiting all nodes on the left of current node.
        if (node.left) {
            this.postorder(arr, node.left)
        }
        // Same is done on the right children.
        if (node.right) {
            this.postorder(arr, node.right)
        }
        // After traversing left and right subtrees push value of current node to arr array after visiting children.
        arr.push(node.data)

        // Return arr array containing values of binary tree in postorder traversal order.
        return arr
    }
    // node is set to this.root to calculate entire tree.
    height(node = this.root) {
        // If node is null or subtree is empty return -1 a height of a tree with no nodes (empty) is -1.
        if (node === null) {
            return -1
        }
        // Recursively call height on left child of current node.
        let left = this.height(node.left)
        // Recursively call height on right child of current node.
        let right = this.height(node.right)

        // After obtaining heights of left and right subtrees, compare left and right.
        if (left > right) {
            // If left is greater than height of right subtree meaning left subtree is taller return left + 1 the + 1 being the current level of node.
            return left + 1;
        } else {
            // Else if right sub tree is greater of the height of left subtree return right + 1.
            return right + 1;
        }
        // Final result returned by height method is the height of binary tree the longest path from root to leaf node.
    }
    // node represents depth we want to find, root is the current root node of tree, level represents current level in tree(default is 0).
    depth(node, root = this.root, level = 0) {
        // If node is null meaning reached the end of branch and node was not found. Return null since node was not found in tree.
        if (!node) {
            return null
        }
        // If root parameter is null meaning reach the end of branch during traversal return 0 indicating node was not found at specified level.
        if (root === null) {
            return 0
        }
        // If data value of root matches data value of node we are searching for, we have found desired node at current level and return the level depth of node.
        if (root.data === node.data) {
            return level
        }

        // If none of above conditions are met recursively call depth passing node, the left child of current root, and level + 1 to search for node in left subtree
        let count = this.depth(node, root.left, level + 1)

        // After reursive call if count is not null meaning node was found in left subtree. Propagate count up call stack and return depth of node.
        if (count !== null) {
            return count
        }
        // If node was not found in left subtree recursively call depth passing in the current node, right child of current root, and level + 1 to search for node in right subtree.
        return this.depth(node, root.right, level + 1)
    }
    // node represents the current node of tree.
    isBalanced(node = this.root) {
        // If node is null meaning reached the end of branch and all nodes of branch are balanced return true to indicate subtree rooted at this node is balanced.
        if (node === null) {
            return true
        }
        // Calculate the difference between heights of left and right subtrees of current node.
        const difference = Math.abs(this.height(node.left) - this.height(node.right))

        //Recursively call on left child of current node and assign result of recursive call to variable determining left subtree of current node is balanced.
        const isLeftBalanced = this.isBalanced(node.left);
        // Same to the right subtree of current node.
        const isRightBalanced = this.isBalanced(node.right);

        // Check is absolute difference between heights of left and right subtrees are less than or equal to 1 along with checking if left and right subtree are balanced. If true return true meaning bst is balanced otherwise return false.
        return difference <= 1 && isLeftBalanced && isRightBalanced;
    }
    rebalance() {
        // Check it bst is empty aka no root node return as there is nothing to balance.
        if (this.root === null) {
            return
        }
        // Call inorder method returning an array containing elements of bst in sorted order. The sorted order is applied to array with comparison function (a,b => a - b) ensuring array is in ascending order. ...new Set removing duplicates and only unique values appear once in array storing it all in sortedArray variable.
        let sortedArray = [...new Set(this.inorder().sort((a, b) => a - b))]
        // Assign root of bst to a new tree built from sortedArray, buildTree method is called with sortedArray as argument constructing a balanced bst. By assigning new root to this.root the original bst is replaced with new rebalanced tree.
        this.root = this.buildTree(sortedArray)
    }
    prettyPrint(node, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

const tree = new Tree([1, 2, 6, 8, 9])

tree.insert(10)
// tree.insert(12)
tree.insert(3)
// tree.insert(5)

// tree.delete(3)
// console.log(tree.find(1))
// tree.buildTree(tree)

// console.log(tree.levelOrder())
// console.log(tree.inorder())
// console.log(tree.preorder())
// console.log(tree.postorder())
tree.prettyPrint(tree.root)
console.log(tree.height())
console.log(tree.depth(tree.find(9)))
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
