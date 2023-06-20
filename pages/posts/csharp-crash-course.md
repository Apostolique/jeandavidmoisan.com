---
title: C# Crash Course
date: 2020-10-24
tags:
 - csharp
 - programming
layout: post
---

When I want to learn a new language, there's usually a series of steps I'll take before I can be productive. I'm writing this article based on what I'd find useful if I wanted to learn C# from scratch.

I'll be focusing on .NET Core in this post. It's cross-platform and open source.

## Index

* [Things to download](#things-to-download)
* [Your first project](#your-first-project)
* [Types](#types)
* [Methods](#methods)
* [If](#if)
* [Loops](#loops)
* [Classes](#classes)
* [NuGet](#nuget)

## Things to download

* [.NET Core SDK](https://dotnet.microsoft.com/download)
* [vscode](https://code.visualstudio.com/)
  * [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
  * [C# FixFormat extension](https://marketplace.visualstudio.com/items?itemName=Leopotam.csharpfixformat)
  * [C# XML Documentation Comments extension](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)

Once the above have been installed, your computer is ready for C# development. To verify, open your terminal and run:

```bash
dotnet --version
```

At the time that I'm writing this, my version is `3.1.403`.

## Your first project

Now that we have that out of the way, let's get a new project started:

1. Create a folder somewhere, call it `HelloWorld`.
2. Open that folder in vscode. (You can start vscode and drag the folder on top of it.)
3. Toggle the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) using the `Ctrl` + `` ` `` (Backtick).
4. Enter the following command:

```bash
dotnet new console
```

5. At this point you will have your initial Hello World program. You can run it using:

```bash
dotnet run
```

You should see `Hello World!` printed in the terminal.

6. Open the Explorer using `Ctrl` + `Shift` + `E`
7. Open `Program.cs` to see the source code. You should see:

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

The first line imports the `System` library. That gives you access to `Console` later.

After that a [namespace](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/namespace) is started. It's a good practice to keep all your code in namespaces. The namespace here is `HelloWorld`. You can name it anything you want.

Inside the namespace, a [class](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/class) is defined called `Program`. You can name your classes anything you want.

Inside the Program class there's a static function called `Main`. Main is your program entry point. When you called `dotnet run` earlier, it specifically looked for it.

Lastly, there's the `WriteLine` function call on the `Console` class. Console is a [static class](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members) which means you don't need an instance of it.

To run your program through the vscode debugger, press `F5` and select `.NET Core` if prompted. That will generate a `.vscode` folder that contains the launch configuration. To check that the debugger works, you can add a breakpoint. Put your cursor on the `Console.WriteLine("Hello World!");` line and press `F9`. Now press `F5` and the program will pause on that line. You can press `F5` to resume the execution.

## Types

C# is a typed language. Here are some of the [built-in types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types):

```csharp
bool isHappy = true;
int num = 10;
float ratio = 3.4f;
double humanCount = 2.5d;
char c = 'c';
string whatName = "What is your name?";
```

You can declare your variables directly in your class' scope or functions:

```csharp
namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            int num = 10;

            int result = num * 2;
        }

        string whatName = "What is your name?";
    }
}
```

Note that you first declare the type, then the variable name before assigning a value.

## Methods

You can declare [methods](https://docs.microsoft.com/en-us/dotnet/csharp/methods) in your class:

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Program p = new Program();
            int num = p.AddFive(10);

            Console.WriteLine(num);
        }

        public int AddFive(int a)
        {
            return a + 5;
        }

        string whatName = "What is your name?";
    }
}
```

Since the `AddFive` function is not static, I created an object instance of the Program class so that I could access it. I called the instance `p`. I stored the result in the `num` variable and printed that out.

Notice the `public` keyword. When public isn't there, the default is `private`. For example `whatName` is currently private. That means you can't do `p.whatName` to access it.

## If

To make everything more interesting, you can use an [if statement](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else).

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            int num = 5;

            if (num > 10)
            {
                Console.WriteLine("Num is bigger than 10!");
            }
            else if (num < 5)
            {
                Console.WriteLine("Num is smaller than 5.");
            }
            else
            {
                Console.WriteLine("Num is 5!!!");
            }
        }
    }
}
```

Here is a list of [comparison operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators): `==`, `<=`, `<`, `>=`, `>`, `!=`

## Loops

Here are a few loops:

```csharp
// for loop
for (int i = 0; i < 5; i++)
{
    Console.WriteLine("Count: " + i);

    // You can also use an interpolated string:
    Console.WriteLine($"Count: {i}");
}

// while loop
int i = 0;
while (i < 5)
{
    Console.WriteLine($"Count: {i}");

    i += 1;
}

// foreach loop
int[] nums = {0, 1, 2, 3, 4};
foreach (int n in nums) {
    Console.WriteLine($"Count: {n}");
}
```

## Classes

You can separate your code into many classes. You can have multiple classes in one file, or you can split them into many files.

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Welcome w = new Welcome("Hello my good friend");

            w.GreetName("Jean-David");
        }
    }

    class Welcome
    {
        public Welcome(string message)
        {
            _message = message;
        }

        public void GreetName(string name)
        {
            Console.WriteLine($"{_message} {name}");
        }

        // It's a good practice to prefix private fields with an underscore.
        private string _message;
    }
}
```
Some notes on the [C# Coding Standards and Naming Conventions](https://github.com/ktaranov/naming-convention/blob/master/C%23%20Coding%20Standards%20and%20Naming%20Conventions.md). I personally don't follow it 100%, but it's a good starting point.

## NuGet

When working with C#, you'll often want to integrate various libraries in your projects. Let's refactor the previous example to accept a name from the launch arguments. That will allow you to start the application with `HelloWorld -n Jean-David`.

There's a good library that makes this task be pretty trivial called [CommandLineParser](https://www.nuget.org/packages/CommandLineParser/). If you look on that page, there's a tab for `.NET CLI`. It will give you the command that will install the CommandLineParser package:

```bash
dotnet add package CommandLineParser --version 2.8.0
```

After running that command, if you open the `HelloWorld.csproj` file, you will see:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="CommandLineParser" Version="2.8.0" />
  </ItemGroup>

</Project>
```

Now look back in the CommandLineParser NuGet page and you'll see there's a `PackageReference` tab. That tab shows what to add to the `.csproj` file if you wanted to install a package manually without the CLI.

If you edit the packages in a `.csproj`, you then have to run a restore:

```csharp
dotnet restore
```

Let's change the previous example to:

```csharp
using System;
using CommandLine;

namespace HelloWorld
{
    class Program
    {
        public class Options
        {
            [Option('n', "name", Required = true, HelpText = "Set the name to welcome.")]
            public string Name { get; set; }
        }

        static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args)
                .WithParsed<Options>(o =>
                {
                    Welcome w = new Welcome("Hello my good friend");
                    w.GreetName(o.Name);
                });
        }
    }

    class Welcome
    {
        public Welcome(string message)
        {
            _message = message;
        }

        public void GreetName(string name)
        {
            Console.WriteLine($"{_message} {name}");
        }

        private string _message;
    }
}
```

You can run the application with:

```bash
dotnet run -n Jean-David
```

If you want to be able to debug the application, you'll need to edit your vscode `launch.json` file. Open `.vscode/launch.json`. Edit the configuration to add the `args` in the array:

```json
{
    "name": ".NET Core Launch (console)",
    "type": "coreclr",
    "request": "launch",
    "preLaunchTask": "build",
    "program": "${workspaceFolder}/bin/Debug/netcoreapp3.1/HelloWorld.dll",
    "args": ["-n", "Jean-David"],
    "cwd": "${workspaceFolder}",
    "console": "internalConsole",
    "stopAtEntry": false
},
```

## Conclusion

If you liked this crash course or want to give me some feedback, feel free to drop by the Discord: <https://discord.rashtal.com/>.

---

TODO:

* Where to find help.
