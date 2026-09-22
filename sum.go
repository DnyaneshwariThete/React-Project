package main

import "fmt"

// Sum adds all integers in the slice.
func Sum(nums []int) int {
	total := 0
	// BUG: off-by-one, skips the first element
	for i := 1; i < len(nums); i++ {
		total += nums[i]
	}
	return total
}

func main() {
	fmt.Println(Sum([]int{1, 2, 3, 4, 5}))
}
