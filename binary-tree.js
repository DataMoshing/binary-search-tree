class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        // Remove duplicate elements from array and sort array in ascending order for bst
        const sortedArray = [...new Set(arr)].sort((a, b) => a - b)
        // Set root node of tree with balanced binary search tree
        this.root = this.buildTree(sortedArray)
    }
    buildTree(sortedArray) {
        if (sortedArray.length === 0)
            return null

        let mid = parseInt((sortedArray.length) / 2)
        let node = new Node(sortedArray[mid])

        node.left = this.buildTree(sortedArray.slice(0, mid))
        node.right = this.buildTree(sortedArray.slice(mid + 1))

        return node
    }
    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value)
        }
        if (node.data === value)
            return node

        if (node.data < value) {
            node.right = this.insert(value, node.right)
        } else {
            node.left = this.insert(value, node.left)
        }
        return node
    }
    minValue(node = this.root) {
        if (!node.left) {
            return node.value
        } else {
            return this.minValue(node.left)
        }
    }
    delete(value) {
        this.root = this.deleteNode(value, this.root);
    }
    deleteNode(value, node = this.root) {
        if (node === null)
            return node;

        if (node.data < value) {
            node.right = this.deleteNode(value, node.right);
        } else if (value < node.data) {
            node.left = this.deleteNode(value, node.left);
        } else {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }
            const minVal = this.minValue(node.right);
            node.data = minVal
            node.right = this.deleteNode(minVal, node.right);
        }
        return node;
    }
    find(value, node = this.root) {
        if (node === null || node.data === value)
            return node
        else if (value < node.data)
            return this.find(value, node.left)
        else
            return this.find(value, node.right)
    }
    levelOrder(arr = [], queue = [], root = this.root) {
        if (root === null)
            return null

        arr.push(root.data)

        queue.push(root.left)
        queue.push(root.right)

        while (queue.length) {
            const level = queue[0]
            queue.shift()
            this.levelOrder(arr, queue, level)
        }
        return arr
    }
    inorder(arr = [], node = this.root) {
        if (node === null)
            return null

        if (node.left) {
            this.inorder(arr, node.left)
        }
        arr.push(node.data)

        if (node.right) {
            this.inorder(arr, node.right)
        }
        return arr
    }
    preorder(arr = [], node = this.root) {
        if (node === null)
            return null

        arr.push(node.data)

        if (node.left) {
            this.preorder(arr, node.left)
        }
        if (node.right) {
            this.preorder(arr, node.right)
        }
        return arr
    }
    postorder(arr = [], node = this.root) {
        if (node === null) {
            return null
        }
        if (node.left) {
            this.postorder(arr, node.left)
        }
        if (node.right) {
            this.postorder(arr, node.right)
        }
        arr.push(node.data)

        return arr
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



const tree = new Tree([1, 6, 8, 9])

tree.insert(10)
tree.insert(12)
tree.delete(12)
// console.log(tree.find(1))
// tree.buildTree(tree)
tree.prettyPrint(tree.root)

console.log(tree.levelOrder())
console.log(tree.inorder())
console.log(tree.preorder())
console.log(tree.postorder())

