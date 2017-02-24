// --------------------------------------------------------------------------
// <copyright file="Admin_AutoFollowBetConfigCollection.cs" >

// </copyright>
// --------------------------------------------------------------------------
// <history>
//   <change who="Louis.Nguyen" date="2012.12.07">Created</change>
// </history>

namespace Fanex.BetFollow.Infrastructure.Configurations
{
    using System.Configuration;
    using System.Diagnostics.CodeAnalysis;

    /// <summary>
    /// Admin Auto Follow Bet Config Collection.
    /// </summary>,
    [SuppressMessage(
        "Microsoft.Design",
        "CA1010:CollectionsShouldImplementGenericInterface",
        Justification = "Reviewed. Suppression is OK here."),
    SuppressMessage("Microsoft.Naming",
        "CA1707:IdentifiersShouldNotContainUnderscores",
        Justification = "Reviewed. Suppression is OK here.")]
    public class Admin_AutoFollowBetConfigCollection : ConfigurationElementCollection
    {
        public override ConfigurationElementCollectionType CollectionType
        {
            get
            {
                return ConfigurationElementCollectionType.AddRemoveClearMap;
            }
        }

        public Admin_AutoFollowBetConfigElement this[int index]
        {
            get
            {
                return (Admin_AutoFollowBetConfigElement)BaseGet(index);
            }

            set
            {
                if (BaseGet(index) != null)
                {
                    BaseRemoveAt(index);
                }

                BaseAdd(index, value);
            }
        }

        public new Admin_AutoFollowBetConfigElement this[string name]
        {
            get
            {
                return (Admin_AutoFollowBetConfigElement)BaseGet(name);
            }
        }

        public void Add(Admin_AutoFollowBetConfigElement element)
        {
            BaseAdd(element);
        }

        public void Remove(Admin_AutoFollowBetConfigElement element)
        {
            if (BaseIndexOf(element) >= 0)
            {
                BaseRemove(element.Id);
            }
        }

        public void RemoveAt(int index)
        {
            BaseRemoveAt(index);
        }

        public void Remove(string alias)
        {
            BaseRemove(alias);
        }

        public void Clear()
        {
            BaseClear();
        }

        public int IndexOf(Admin_AutoFollowBetConfigElement element)
        {
            return BaseIndexOf(element);
        }

        protected override void BaseAdd(ConfigurationElement element)
        {
            BaseAdd(element, false);
        }

        protected override sealed ConfigurationElement CreateNewElement()
        {
            return new Admin_AutoFollowBetConfigElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((Admin_AutoFollowBetConfigElement)element).Id;
        }
    }
}
