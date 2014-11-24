namespace MVVMtpl.Base
{
    using System.ComponentModel;
    using System.Runtime.CompilerServices;
    public abstract class ObservableObject : INotifyPropertyChanged
    {
        /// <summary>
        /// This event notifies if the property changes
        /// </summary>
        public event PropertyChangedEventHandler PropertyChanged;

        /// <summary>
        /// Set new value to a property
        /// </summary>
        /// <typeparam name="T">Value type</typeparam>
        /// <param name="where">Field to store value</param>
        /// <param name="value">Value of the property</param>
        /// <param name="propertyName">C#5 is the property name</param>
        public void Set<T>(ref T where, T value, [CallerMemberName] string propertyName = null)
        {
            where = value;
            this.OnPropertyChanged(propertyName);
        }

        /// <summary>
        /// Notifies to suscribers that the property changed
        /// </summary>
        /// <param name="propertyName">Name of the property</param>
        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            var handler = this.PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(propertyName));
            }

        }
    }
}
