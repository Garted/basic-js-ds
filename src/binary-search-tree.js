const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    const node = new Node(data);

    if (this.tree === null) {
      this.tree = node;
    } else {
      this.addNode(this.tree, node);
    }
  }
  addNode(current, newNode) {
    if (newNode.data < current.data) {
      if (current.left === null) {
        current.left = newNode;
      } else {
        this.addNode(current.left, newNode);
      }
    } else {
      if (current.right === null) {
        current.right = newNode;
      } else {
        this.addNode(current.right, newNode);
      }
    }
  }

  has(data) {
    return this.findKeysByName(this.tree, 'data').some(
      (item) => item.data === data
    );
  }
  find(data) {
    if (
      this.findKeysByName(this.tree, 'data').filter(
        (item) => item.data === data
      ).length === 0
    ) {
      return null;
    }

    return this.findKeysByName(this.tree, 'data').filter(
      (item) => item.data === data
    )[0];
  }

  remove(data) {
    this.tree = this.removeNode(this.tree, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const minRight = this.findMinNode(node.right);
        node.data = minRight.data;
        node.right = this.removeNode(node.right, minRight.data);
        return node;
      }
    }
  }
  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  findKeysByName(tree, keyName) {
    const results = [];
    function search(tree) {
      if (typeof tree !== 'object' || tree === null) {
        return;
      }
      for (const key in tree) {
        if (key === keyName) {
          results.push(tree);
        }
        search(tree[key]);
      }
    }
    search(tree);
    return results;
  }
  min() {
    return this.findKeysByName(this.tree, 'data')
      .map((item) => {
        return item.data;
      })
      .sort((a, b) => a - b)[0];
  }

  max() {
    return this.findKeysByName(this.tree, 'data')
      .map((item) => {
        return item.data;
      })
      .sort((a, b) => a - b)
      .reverse()[0];
  }
}

module.exports = {
  BinarySearchTree,
};
