---
title: 'New Solution File `slnx` Support In Visual Studio Preview'
published: 2024-04-13
description: 'A new solution file format for .NET projects is now available in the latest preview version of Visual Studio 2022 17.10.0 Preview 3.'
image: '@assets/posts/placeholder-globules.png'
tags: [".NET", ".NET Core", "Solution", "Visual Studio", "slnx", "featured"]
---

A new solution file format for .NET projects is now available in the latest preview version of Visual Studio 2022, 17.10.0 Preview 3.

Download and install the latest preview version: [Visual Studio Preview](https://visualstudio.microsoft.com/vs/preview/)

Enable the new format. Select `Tools > Option > Environment > Preview Features >` and then check `Use Solution File Persistence Model`.

![Enable New Solution Persistence Options](@assets/posts/visual-studio-enable-solution-file-persistence-option.png)

Create a normal solution, add a project, and select `File > Save As`.

![New Solution File Format](@assets/posts/visual-studio-new-solution-file-format.png)

A new file format option, `Xml Solution File (*.slnx)` is available.

![New Solution File Format Save As](@assets/posts/visual-studio-new-solution-file-format-save-as-slnx.png)

Open in folder view to see the new solution file format saved alongside the existing solution file.

![New Solution File Format Saved](@assets/posts/visual-studio-new-solution-file-format-save-as-slnx-saved.png)

The new `slnx` file format is shown alongside the existing `sln` file format. Attempting to open the new solution file from Visual Studio may not work.

![New Solution File Format Open](@assets/posts/visual-studio-new-solution-file-format-save-as-slnx-open.png)

Drag the new solution file onto Visual Studio to open it.

[Video Demo of Dragging To Open new slnx file in Visual Studio](@assets/posts/open-slnx-in-visual-studio.mp4)

<https://youtu.be/v6eh2YXi8is>

Compare the contents of the new `slnx` file with the existing `sln` file. The existing format involves GUIDs and is difficult to read ([Reference](https://learn.microsoft.com/en-us/visualstudio/extensibility/internals/solution-dot-sln-file?view=vs-2022)).

```bash
$ cat NewSolutionFileFormat.sln
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.10.34804.81
MinimumVisualStudioVersion = 10.0.40219.1
Global
        GlobalSection(ExtensibilityGlobals) = postSolution
                SolutionGuid = {5923F19F-946A-4B1F-A4EE-579199F9CF15}
        EndGlobalSection
        GlobalSection(SolutionProperties) = preSolution
                HideSolutionNode = FALSE
        EndGlobalSection
EndGlobal
```

The new solution file format is easier to read and follows the XML standard.

```bash
$ cat NewSolutionFileFormat.slnx
<Solution>
  <Project Path="ConsoleApp1\ConsoleApp1.csproj" Type="Classic C#" />
</Solution>
```

References:

[Welcome to the new Visual Studio SLNX Solution File - SchwabenCode.com | Benjamin Abt](https://schwabencode.com/blog/2024/04/10/welcome-new-visual-studio-slnx-solution-file)

> For many years, there has been a lot of criticism of Visual Studio's current solution format. It is very difficult to read, it does not follow any standard and you need your own parser. Changes are virtually only possible with Visual Studio - and there are constant merge problems.
>
> Microsoft has now tackled the problem and developed a new format based on XML. It is easier to read, follows this XML standard and can also be edited without Visual Studio. The new format is currently being introduced as a preview in Visual Studio 2022 v17.10 and must be activated manually in the options.

[New .slnx Solution Format in Visual Studio — no more GUIDs! - YouTube](https://www.youtube.com/watch?time_continue=1&v=wzMMclD8QsI&embeds_referring_euri=https%3A%2F%2Ftwitter.com%2F&source_ve_path=MjM4NTE&feature=emb_title)

A video walkthrough of enabling and using the new solution file format in Visual Studio 2022 Preview by Martin Zikmund.

[You Need to Update Your .NET Solution Files! - YouTube](https://www.youtube.com/watch?v=D0MxmDWk4t0)

> Hello, everybody, I'm Nick, and in this video I will introduce you to the new Solution Format that is coming with the latest Visual Studio Preview. This new format is called .slnx and it is a simple XML format to replace the old nightmare of .sln files.

This video, by Nick Chapses, discusses the complexity of the existing solution file format and the benefits of the new `slnx` format.

[An approach for managing VS Solution files in large codebases - YouTube](https://www.youtube.com/watch?v=TOaNOvK-i30)

> Discussing the disadvantages of using & maintaining Visual Studio Solution files like the *.sln or the new*.slnx file formats in big projects with big teams, and suggesting an alternative approach.
>
> This approach is suitable for projects with big solution files that are actively being developed by many developers at once. If that is not your use case, this approach might not be suitable for you.

This video demonstrates a different approach to managing large codebases with Visual Studio solution files.

It suggests not using `sln`, or even the new `slnx` files, for managing large codebases and instead use the `slngen` from Microsoft.

- [microsoft/slngen: Visual Studio solution generator](https://github.com/microsoft/slngen)
- [Overview | slngen](https://microsoft.github.io/slngen/)
