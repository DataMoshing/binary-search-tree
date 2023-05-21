class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        this.sortedArray = [...new Set(arr)].sort((a, b) => a - b)
        this.root = this.buildTree(this.sortedArray)
    }
    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null

        let mid = parseInt((sortedArray.length) / 2)
        let node = new Node(sortedArray[mid])

        node.left = this.buildTree(sortedArray.slice(0, mid))
        node.right = this.buildTree(sortedArray.slice(mid + 1))

        return node
    }
    insert(root, key) {
        if (root === null) {
            root = new Node(key)
            return root
        }
        if (key < root.key) {
            root.left = this.insert(root.left, key)
        } else if (key > root.key) {
            root.right = this.insert(root.right, key)
        }
        return root
    }
}


let arr = [1, 6, 8, 9, 11, 67, 2, 4]
// [1,2,4,6,8,9,11,67]
const tree = new Tree(arr)

console.log(tree.buildTree(arr))

