class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr)
    }
    buildTree(arr, start, end) {
        if (start > end) {
            return null
        }

        let mid = parseInt((start + end) / 2)
        let node = new Node(arr[mid])

        node.left = buildTree(arr, start, mid - 1)
        node.right = buildTree(arr, mid + 1, end)

        return node
    }
}
