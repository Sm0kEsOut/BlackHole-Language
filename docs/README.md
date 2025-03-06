# BlackHole Compiler Language

**BlackHole** is a modern, easy-to-use programming language designed for simplicity, performance, and expressiveness. Whether you're a beginner or an experienced developer, BlackHole provides a clean syntax and powerful features to help you write efficient and maintainable code.

## Features

- **Simple Syntax**: Easy-to-read and write syntax inspired by modern programming languages.
- **Strong Typing**: Ensures type safety and reduces runtime errors.
- **Memory Management**: Automatic memory management with garbage collection.
- **Concurrency Support**: Built-in support for concurrent programming.
- **Cross-Platform**: Compiles to native code for multiple platforms.
- **Extensible**: Easily extend the language with custom libraries and modules.

## Installation

To get started with BlackHole Compiler Language, follow these steps:

1. **Download the Compiler**:
   - Visit the [releases page](https://github.com/Sm0kEsOut/BlackHole-Language/releases) and download the latest version for your platform.

2. **Install the Compiler**:
   - **Windows**: Run the installer and follow the on-screen instructions.
   - **macOS/Linux**: Extract the archive and add the `bin` directory to your `PATH`.

3. **Verify Installation**:
   ```bash
   blackhole --version

## Getting Started

### Hello, World!

Let's start with a simple "Hello, World!" program.
```
// hello.bh
function main() {
    print("Hello, World!");
}
```

To compile and run the program:

```
blackhole compile hello.bh ./hello
```

### Comments

Blackhole supports both single-line and multi-line comments.

**Single-line Comments (`--`)**

Single-line comments start with `--` and continue to the end of the line.
```
function main() {
    -- This is a single-line comment
    print("Hello, World!"); -- This is another comment
}
```

**Multi-line Comments (``-[[ ]]-``)**

Multi-line comments are enclosed in ``-[[ and ]]-``.
```
function main() {
    -[[
        This is a multi-line comment.
        It can span multiple lines.
    ]]- 
    print("Hello, World!");
}
```

### Variables and Types

Blackhole supports various data types, including integers, floats, strings, and booleans.
```
function main() {
    int age = 25;
    float height = 5.9;
    string name = "Alice";
    bool isStudent = true;

    print("Name: " .. name); -- "Name: Alice"
    print("Age: " .. age); -- "Age: 25
    print("Height: " .. height); -- "Height: 5.9"
    print("Is Student: " .. isStudent); -- "Is Student: true"
}
```

### Control Structures

Blackhole provides standard control structures like `if`, `else`, `for`, `while`, and `repeat until`.
```
function main() {
    int number = 10;

    if (number > 0) {
        print("Number is positive.");
    } else if (number < 0) {
        print("Number is negative.");
    } else {
        print("Number is zero.");
    }

    for (int i = 0; i < 5; i++) {
        print("Iteration: " .. i);
    }

    while (number > 0) {
        print("Countdown: " .. number); -- "Countdown: 10, 9, 8..."
        number--;
    }
}
```
`repeat until`

The `repeat until` loop executes a block of code repeatedly until a condition is met. The condition is checked after the block is executed.
```
function main() {
    int counter = 0;

    repeat {
        print("Counter: " + counter);
        counter++;
    } until (counter >= 5);  -- Loop until counter is 5 or greater
}
```

### Functions

Functions are first-class citizens in Blackhole. You can define and call functions easily. We have two different declariations for functions, `function` or `func`.
```
function add(int a, int b) -> int {
    return a + b;
}

func main() {
    int result = add(5, 3); -- Result is 8
    print("5 + 3 = " .. result); -- "5 + 3 = 8"
}
```

### Operations

Blackhole supports various operations, including floor division, exponentiation, modulus, and length.

**Floor Division (`//`)**

Floor division returns the largest integer less than or equal to the division result.
```
function main() {
    int a = 10;
    int b = 3;
    int result = a // b;  -- Result is 3
    print("10 // 3 = " .. result); -- "10 // 3 = 3"
}
```

**Exponentiation (`^`)**

Exponentiation raises a number to the power of another.
```
function main() {
    int base = 2;
    int exponent = 3;
    int result = base ^ exponent;  -- Result is 8
    print("2 ^ 3 = " .. result); -- "2 ^ 3 = 8"
}
```

**Modulus (`%`)**

Modulus returns the remainder of a division.
```
function main() {
    int a = 10;
    int b = 3;
    int result = a % b;  -- Result is 1
    print("10 % 3 = " .. result); -- "10 % 3 = 1"
}
```

**Length Operator (`#`)**

The length operator returns the length of a string or array.
```
function main() {
    string name = "Alice";
    int length = #name;  -- Result is 5
    print("Length of Alice: " .. length); -- "Length of Alice: 5"

    int[] numbers = [1, 2, 3, 4, 5];
    int arrayLength = #numbers;  -- Result is 5
    print("Length of numbers array: " .. arrayLength); -- "Length of numbers array: 5"
}
```

**Concatenation (`..`)**

The `..` operator is used to concatenate strings or arrays.
```
function main() {
    string firstName = "John";
    string lastName = "Doe";
    string fullName = firstName .. " " .. lastName;  -- Result is "John Doe"
    print("Full Name: " + fullName);

    int[] arr1 = [1, 2, 3];
    int[] arr2 = [4, 5, 6];
    int[] combined = arr1 .. arr2;  -- Result is [1, 2, 3, 4, 5, 6]
    print("Combined Array: " + combined);
}
```

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bugfix.

3. Submit a pull request with a detailed description of your changes.

## License

Blackhole is licensed under the BSD 3-Clause License. See the [LICENSE](https://github.com/Sm0kEsOut/BlackHole-Language/blob/main/LICENSE) file for more details.

## Support

If you have any questions or need support, please open an [issue](https://github.com/Sm0kEsOut/BlackHole-Language/issues/new) on the GitHub repository, join our discord, or join our community [discussion](https://github.com/Sm0kEsOut/BlackHole-Language/discussions).
