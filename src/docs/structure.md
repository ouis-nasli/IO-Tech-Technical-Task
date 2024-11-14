# Project Structure

### Modules Folders :

```
- userManagement
  - users
  - groups
```

-   userManagement is a module
-   users and groups are submodules
-   module nameing format is camelCase

# Component as Module

In our project structure, we use a concept called "Component as Module". This pattern is used when a component has its own files and components. Here's how to apply it:

-   Put the component file in a folder. This folder now acts as a module.
-   Place all files related to this component in that folder.
-   Use files in this folder only within this component and its nested files.
-   Never use it outside of this folder or component.
-   All file and folder naming should follow the camelCase format, except for Component files and their folders.

For example:

Profile Component

```
- Profile
  - Profile.tsx
  - context
  - dummyData.ts
  - style.ts
  - helpers
      getSum.tsx
  - hooks
      useHash.tsx
```

If the component is large, you can break it down into multiple components:

-   These are called "local components" and should be placed in the components folder.

```
- Profile
  - Profile.tsx
      - components
          ProfileAvatar.tsx
          ProfileImagePicker.tsx
          ProfileFooter.tsx
  - context
  - dummyData.ts
  - style.ts
  - helpers
      getSum.tsx
  - hooks
```

This concept can be applied to any component, including Modules, Pages, Components, and Sub Components.
