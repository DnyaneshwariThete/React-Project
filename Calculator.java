public class Calculator {
    // BUG: integer division truncates instead of returning a precise average
    public static double average(int a, int b) {
        return (a + b) / 2;
    }

    public static void main(String[] args) {
        System.out.println(average(3, 4));
    }
}
