; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "SysMonitor"
#define MyAppVersion "1.0.0.0"
#define MyAppPublisher "WebEnv"
#define MyAppURL "https://www.webenv.io/"
#define MyAppExeName "SysMonitor.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{9D72883F-216C-4160-9005-D8723B67D050}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableDirPage=yes
DisableProgramGroupPage=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
OutputBaseFilename=SysMonitor.Setup
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "SysMonitor.Service\bin\Release\*"; DestDir: "{app}/Service"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\SysMonitor.UI\SysMonitor-win32-x64\*"; DestDir: "{app}/Application"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\Application\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\Application\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: {sys}\sc.exe; Parameters: "create SysMonitor start= auto binPath= ""{app}\Service\SysMonitor.Service.exe""" ; Flags: runhidden
Filename: {sys}\sc.exe; Parameters: "start SysMonitor" ; Flags: runhidden
Filename: "{app}\Application\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: {sys}\sc.exe; Parameters: "stop SysMonitor" ; Flags: runhidden
Filename: {sys}\sc.exe; Parameters: "delete SysMonitor" ; Flags: runhidden

[UninstallDelete]
Type: files; Name: "{win}\MYPROG.INI"

