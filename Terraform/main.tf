terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.99.0"
    }
  }
}
provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "Amazon_Clone" {
  name="AmazonClone"
  location = "Sweden Central"
  
}
resource "azurerm_virtual_network" "Amazon_Clone" {
  name = "AmazonClonevpn"
  address_space = ["10.0.0.0/16"]
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
}

resource "azurerm_subnet" "Amazon_Clone" {
  name = "AmazonClonesub"
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  virtual_network_name = azurerm_virtual_network.Amazon_Clone.name
  address_prefixes = ["10.0.2.0/24"]
  
}
resource "azurerm_public_ip" "Amazon_Clone_public_IP" {
  name                = "Amazon_Clone_public_IP"
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  location            = azurerm_resource_group.Amazon_Clone.location
  allocation_method   = "Dynamic"
}
resource "azurerm_network_interface" "Amazon_Clone" {
  name = "AmazonCloneNic"
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  ip_configuration {
    name                          = "AmazonCloneConfig1"
    subnet_id                     = azurerm_subnet.Amazon_Clone.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.Amazon_Clone_public_IP.id 
  }
}
resource "azurerm_network_security_group" "Amazon_Clone" {
  name="AmazonCloneSecurityGroup"
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  
}
# Create a security rule to allow inbound traffic on port 80 (HTTP) from any source
resource "azurerm_network_security_rule" "http" {
  name                        = "allow-http"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "80"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.Amazon_Clone.name
  network_security_group_name = azurerm_network_security_group.Amazon_Clone.name
}

# Create a security rule to allow inbound traffic on port 443 (HTTPS) from any source
resource "azurerm_network_security_rule" "https" {
  name                        = "allow-https"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.Amazon_Clone.name
  network_security_group_name = azurerm_network_security_group.Amazon_Clone.name
}

# Create a security rule to allow inbound traffic on port 22 (SSH) from any source
resource "azurerm_network_security_rule" "ssh" {
  name                        = "allow-ssh"
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.Amazon_Clone.name
  network_security_group_name = azurerm_network_security_group.Amazon_Clone.name
}
resource "azurerm_network_security_rule" "ssh" {
  name                        = "allow-ssh"
  priority                    = 130
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "1433"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.Amazon_Clone.name
  network_security_group_name = azurerm_network_security_group.Amazon_Clone.name
}
resource "azurerm_linux_virtual_machine" "Amazon_Clone" {
  name  = "AmazonCloneVM1"
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  network_interface_ids = [ azurerm_network_interface.Amazon_Clone.id ]
  size = "Standard_B2ms"
  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
  os_disk {
    name              = "AmazonCloneOSDisk1"
    caching           = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb = 30
  }
    computer_name  = "AmazonCloneUser"
    admin_username = "azureuser"
    disable_password_authentication = true
    admin_ssh_key {
      username = "azureuser"
      public_key = file("~/.ssh/id_rsa.pub")
    }
    depends_on = [ 
      azurerm_network_interface.Amazon_Clone
    ]
    user_data = base64encode(data.template_file.Amazon_Clone.rendered) 
  
}