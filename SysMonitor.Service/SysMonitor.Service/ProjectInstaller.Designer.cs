namespace SysMonitor.Service
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.SysMonitorProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.SysMonitoryInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // SysMonitorProcessInstaller
            // 
            this.SysMonitorProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.SysMonitorProcessInstaller.Password = null;
            this.SysMonitorProcessInstaller.Username = null;
            // 
            // SysMonitoryInstaller
            // 
            this.SysMonitoryInstaller.ServiceName = "SysMonitor";
            this.SysMonitoryInstaller.StartType = System.ServiceProcess.ServiceStartMode.Automatic;
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.SysMonitorProcessInstaller,
            this.SysMonitoryInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller SysMonitorProcessInstaller;
        private System.ServiceProcess.ServiceInstaller SysMonitoryInstaller;
    }
}