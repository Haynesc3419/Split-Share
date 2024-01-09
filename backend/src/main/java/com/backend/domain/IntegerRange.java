package com.backend.domain;

public class IntegerRange {
    private int min;
    private int max;

    public IntegerRange(int min, int max) {
        this.min = min;
        this.max = max;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    @Override
    public String toString() {
        if (min == max) {
            return String.format("[%d]", min);
        } else {
            return String.format("[%d, %d]", min, max);
        }
    }
}
