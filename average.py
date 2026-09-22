def average(numbers):
    """Return the average of a list of numbers."""
    # BUG: no guard for an empty list -> ZeroDivisionError
    return sum(numbers) / len(numbers)


def main():
    scores = [80, 92, 75, 88]
    print(f"Average score: {average(scores)}")


if __name__ == "__main__":
    main()
