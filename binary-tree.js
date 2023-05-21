class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        const sortedArray = [...new Set(arr)].sort((a, b) => a - b)
        this.root = this.buildTree(sortedArray)
    }
    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null

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
        if (node.data === value) return node

        if (node.data < value) {
            node.right = this.insert(value, node.right)
        } else {
            node.left = this.insert(value, node.left)
        }
        return node
    }
    delete(data) {

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
// tree.buildTree(tree)
tree.prettyPrint(tree.root)
