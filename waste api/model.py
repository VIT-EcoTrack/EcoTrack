import torch
import torch.nn as nn
import torchvision.models as models

class WasteClassifierResNet(nn.Module):
    def __init__(self, num_classes=9, resnet_size=50):
        super(WasteClassifierResNet, self).__init__()
        if resnet_size == 50:
            self.backbone = models.resnet50(pretrained=False)
        elif resnet_size == 34:
            self.backbone = models.resnet34(pretrained=False)
        else:
            raise ValueError("Invalid resnet_size. Choose 34 or 50.")
        in_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Linear(in_features, num_classes)

    def forward(self, x):
        return self.backbone(x)

def create_efficient_resnet(pretrained=True, resnet_size=50):
    model = WasteClassifierResNet(num_classes=9, resnet_size=resnet_size)
    return model 