export function maxHeapify(arr, i, heapSize = arr.length) {
  let l = 2 * i;
  let r = 2 * i + 1;
  let largest = 0;

  if (l <= heapSize && arr[l] > arr[i]) {
    largest = l;
  } else {
    largest = i;
  }

  if (r <= heapSize && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    maxHeapify(arr, largest);
  }
}

export function buildMaxHeap(arr) {
  const size = arr.length;
  for (var i = Math.floor(size / 2); i >= 0; i--) {
    maxHeapify(arr, i);
  }
}
