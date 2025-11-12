# Product Inventory UI - Frontend Challenge

## Your Challenge (1 Hour Total)

**Important:** This challenge contains more than an hour's worth of potential work. This is intentional. We don't expect you to complete everything - focus on demonstrating your problem-solving approach, debugging skills, and prioritization abilities.

This challenge consists of **two parts**:

### Part 1: AI Collaboration Challenge (10-15 minutes) 🤖
Write a detailed AI prompt for implementing a bulk operations feature (DO NOT code it - just write the prompt). This demonstrates modern development skills.

### Part 2: Coding Challenge (45-50 minutes) 💻
Identify and fix bugs, performance issues, and accessibility problems in the existing codebase. Use your judgment to prioritize which issues to tackle first based on impact and complexity.

---

## 🤖 Part 1: AI Collaboration Challenge

**🚫 DO NOT IMPLEMENT** any code. **DO NOT RUN** any AI prompts. This is purely a prompt writing exercise.

**Your Task:**
Complete the `Prompt.md` file at the root of the project. The file is already created with structured sections for you to fill out:

1. **AI Tool Selection** - Which tool you'd choose and why
2. **Comprehensive Prompt** - Your complete prompt including codebase context and constraints  
3. **Collaboration Approach** - How you'd iterate with the AI to implement the feature

**⚠️ Important:** 
- **Only fill out the Prompt.md file** - do not implement any code for the bulk operations feature
- **Do not run your prompt** with any AI tool - this is a writing exercise only
- This tests your ability to write effective AI prompts, not to implement features

**💡 Tip:** Spend a few minutes exploring the codebase first to understand the architecture, then complete your prompt.

---

## 💻 Part 2: Coding Challenge

The application contains **intentional bugs and issues** across multiple areas. Use your judgment to prioritize which issues to address based on impact and complexity.

### 🚨 Critical Bugs
The application has several critical bugs that break core functionality. Explore the product list filtering, API error handling, and form validation to identify and fix these issues.

### ⚡ Performance Issues  
The app has performance bottlenecks causing unnecessary re-renders and API calls. Use browser DevTools to identify and optimize these problems.

### ♿ Accessibility & UX Issues
The application has accessibility and user experience problems. Test with keyboard navigation and screen readers to identify areas for improvement.

### 📝 Documentation
Throughout your work, document any additional issues you identify but don't have time to fix.

---

## Evaluation Criteria

Your work will be evaluated on:

1. **Problem-Solving Approach** - How you prioritize and tackle issues systematically
2. **Bug Detection & Fixes** - Quality of issues identified and solutions implemented
3. **Code Quality** - Clean, maintainable solutions following React/Next.js best practices  
4. **AI Collaboration** - Quality and thoughtfulness of your AI prompt and strategy
5. **Testing & Documentation** - Test coverage and clear documentation of changes

---

## Reference Information

### Setup & Getting Started

### Setup Instructions

**Project Requirements:**
- **Node.js 18+**
- **npm 8+**

### Installing Required Software

1. **Install Node.js and npm:**
   We recommend using [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) for managing Node.js versions:

   ```bash
   # Install nvm (for Unix/macOS)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Restart terminal or run:
   source ~/.bashrc
   
   # Install and use Node.js 18
   nvm install 18
   nvm use 18
   ```

2. **Verify Installation:**
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 8.x.x or higher
   ```

### Setting Up the Project

1. **Fork/Clone the repository** and navigate to the `product-inventory-ui/` directory
2. **Create a new branch** for your work:
   ```bash
   git checkout -b fix-inventory-ui-issues
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser** to `http://localhost:3000` to see the application

### Available Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing
npm test            # Run Jest tests
npm run test:watch  # Run tests in watch mode
```

### Workflow Instructions

1. **Explore the Application:**
   - Run the app and interact with all features
   - Test filtering, product creation, and navigation
   - Try edge cases like empty states, invalid inputs, and network errors

2. **Identify Issues:**
   - Use browser DevTools to identify performance problems
   - Test with screen readers or accessibility tools
   - Review the codebase for logical errors and inefficiencies
   - Document each issue you find with a brief explanation

3. **Implement Fixes:**
   - Fix bugs in order of priority (logical bugs first)
   - Optimize performance bottlenecks
   - Improve accessibility compliance
   - Enhance error handling and user experience
   - Write/update tests for your changes

4. **Test Your Fixes:**
   - Verify all functionality works correctly
   - Run the test suite: `npm test`
   - Check type safety: `npm run type-check`
   - Lint your code: `npm run lint`
   - Test in different browsers and screen sizes

5. **Create Pull Request:**
   - Commit your changes with clear, descriptive messages
   - Create a pull request with a summary of all issues fixed
   - Include before/after descriptions of the improvements made

### Testing Framework

- **Jest** with React Testing Library is configured for unit and integration testing
- **Test files** should be placed in `__tests__/` directories or use `.test.tsx` suffixes
- **Focus on testing:** Fixed bugs, edge cases, accessibility features, and critical user flows

### Example Issues (Hints)

Here are some categories of issues to look for (without giving away specific bugs):

- **Data Filtering:** Check if filters work correctly in all combinations
- **API Calls:** Look for unnecessary network requests or poor error handling  
- **Component Re-renders:** Identify components that re-render more than needed
- **Form Handling:** Test edge cases in form validation and submission
- **Accessibility:** Check if all interactive elements are keyboard accessible
- **Loading States:** Ensure proper loading indicators and error messages
- **Add Error Boundaries** for better error handling


### Additional Considerations

If you have time remaining, consider these enhancements:

- **Implement keyboard shortcuts** for power users
- **Document additional issues** you discovered
- **TypeScript:** Look for areas where types could be more specific or safe

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

### Getting Help

If you encounter setup issues or have questions about the requirements, don't hesitate to ask for clarification. Focus on demonstrating your problem-solving approach and technical decision-making process.

Good luck! 🚀
