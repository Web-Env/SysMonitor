using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SysMonitor.Service
{
    [RunInstaller(true)]
    public partial class ProjectInstaller : System.Configuration.Install.Installer
    {
        public ProjectInstaller()
        {
            InitializeComponent();
        }
        protected override void OnBeforeInstall(IDictionary savedState)
        {
            base.OnBeforeInstall(savedState);

            if (!EventLog.SourceExists("SysMonitor"))
                EventLog.CreateEventSource("SysMonitor", "Application");
        }

        protected override void OnAfterUninstall(IDictionary savedState)
        {
            base.OnAfterInstall(savedState);

            if (EventLog.SourceExists("SysMonitor"))
                EventLog.DeleteEventSource("SysMonitor");
        }
    }
}
