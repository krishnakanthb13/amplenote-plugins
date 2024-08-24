---
title: Graph Utility - Animations
uuid: edd30c6a-623d-11ef-bed3-b6c19b417745
version: 7
created: '2024-08-24T22:55:58+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

In Chart.js, the `easing` option controls the easing function used for animations, which affects how the animation progresses over time. 

The `easing` functions define the pace of the animation, creating effects like bouncing, elastic movements, or smooth transitions.

\

Here are the different easing options available in Chart.js:

### 1. **Linear**

- **`'linear'`**: The animation progresses at a constant speed from start to finish.

- Example: A linear motion with no acceleration or deceleration.

### 2. **Ease-In**

- **`'easeInQuad'`**: The animation starts slowly and accelerates as it progresses.

- **`'easeInCubic'`**: Similar to `easeInQuad`, but with a more pronounced acceleration.

- **`'easeInQuart'`**: Even stronger acceleration than cubic.

- **`'easeInQuint'`**: The strongest acceleration among the ease-in options.

### 3. **Ease-Out**

- **`'easeOutQuad'`**: The animation starts fast and decelerates towards the end.

- **`'easeOutCubic'`**: Similar to `easeOutQuad`, but with a more pronounced deceleration.

- **`'easeOutQuart'`**: Even stronger deceleration than cubic.

- **`'easeOutQuint'`**: The strongest deceleration among the ease-out options.

### 4. **Ease-In-Out**

- **`'easeInOutQuad'`**: The animation starts slow, accelerates, and then decelerates towards the end.

- **`'easeInOutCubic'`**: A more pronounced version of `easeInOutQuad`.

- **`'easeInOutQuart'`**: Stronger acceleration and deceleration than cubic.

- **`'easeInOutQuint'`**: The strongest acceleration and deceleration among ease-in-out options.

### 5. **Bounce**

- **`'easeOutBounce'`**: The animation moves quickly at first, then bounces at the end.

- **`'easeInBounce'`**: The animation starts with a bounce and then accelerates.

- **`'easeInOutBounce'`**: Combines both `easeInBounce` and `easeOutBounce`, creating a bounce at both the start and the end.

### 6. **Elastic**

- **`'easeOutElastic'`**: The animation overshoots a bit and then snaps back into place, like an elastic band.

- **`'easeInElastic'`**: The animation starts by snapping into place, then overshoots.

- **`'easeInOutElastic'`**: A combination of `easeInElastic` and `easeOutElastic`.

### 7. **Back**

- **`'easeOutBack'`**: The animation moves slightly past its endpoint and then returns to finish.

- **`'easeInBack'`**: The animation begins by moving slightly back before progressing forward.

- **`'easeInOutBack'`**: A combination of `easeInBack` and `easeOutBack`, with slight overshoot at the start and end.

---

### **Explanation:**

- **HTML Setup**: The dropdown and canvas are included in the HTML. The canvas element will be used to render the chart.

- **JavaScript**:

    - **Initial Setup**: Initializes the `Chart.js` chart with the selected easing function from the dropdown.

    - **Event Listener**: Adds an event listener to the dropdown that updates the chart's easing function whenever the user selects a different option. It then calls `myChart.update()` to apply the new easing function and re-render the chart.

With this setup, the chart will dynamically update its animation easing function based on the user’s selection from the dropdown.